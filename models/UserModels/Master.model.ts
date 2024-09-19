// models/Master.model.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IMaster extends Document {
  username: string;
  email: string;
  password: string; // This should be hashed
  role: 'admin' | 'doctor' | 'medicalStaff' | 'patient';
}

const MasterSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'doctor', 'medicalStaff', 'patient'],
    required: true,
  },
});

const Master = mongoose.model<IMaster>('Master', MasterSchema);
export default Master;
