// controllers/admin.controller.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModels/admin.model';
import Master from '../models/UserModels/Master.model'; // Import Master model
import dotenv from 'dotenv'
dotenv.config();
// Register Admin
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User instance
    const user = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'admin',
    });

    await user.save();

    // Also store the admin in the Master collection
    const masterUser = new Master({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'admin',
    });

    await masterUser.save();

    // Generate a token for the user
    const token = user.generateToken();
    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Admin
// export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     const isMatch = await user.checkPassword(password);
//     if (!isMatch) {
//       res.status(400).json({ message: 'Invalid credentials' });
//       return;
//     }

//     const token = user.generateToken();
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error logging in admin:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
