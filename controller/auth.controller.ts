// controllers/auth.controller.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Master from '../models/UserModels/Master.model';
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable for secret
console.log('secret key',JWT_SECRET);

// Sign In for All Users
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user in the Master collection
    const user = await Master.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: `Sign in successfully as ${user.role}`, token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};
