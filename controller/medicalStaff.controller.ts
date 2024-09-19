// controllers/medicalStaff.controller.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import MedicalStaff from '../models/UserModels/medicalStaff.moduel';
import Master from '../models/UserModels/Master.model'; // Import Master model
import dotenv from 'dotenv'
dotenv.config();
// Register Medical Staff
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, department } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await MedicalStaff.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new MedicalStaff({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role:"medicalStaff",
      department,
    });

    // Save the new user to the database
    await user.save();

    // Store the medical staff info in the Master collection
    const masterUser = new Master({
      username,
      email,
      password: hashedPassword, // Store the hashed password
      role:"medicalStaff",
    });

    await masterUser.save();

    // Generate JWT token
    const token = user.generateToken();
    
    // Respond with success message and token
    res.status(201).json({ message: 'Medical staff registered successfully', token });
  } catch (error) {
    console.error('Error registering medical staff:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login Medical Staff
// export const login = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await MedicalStaff.findOne({ email });
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     // Check if the password is correct
//     const isMatch = await user.checkPassword(password);
//     if (!isMatch) {
//       res.status(400).json({ message: 'Invalid credentials' });
//       return;
//     }

//     // Generate JWT token
//     const token = user.generateToken();
    
//     // Respond with success message and token
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error logging in medical staff:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
