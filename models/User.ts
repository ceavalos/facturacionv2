// /models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { RoleType } from './Role';

interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  contactNumber: string;
  company: Schema.Types.ObjectId;
  role: RoleType;
  active: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  role: { 
    type: String, 
    enum: ['rl_admin', 'rl_user'],
    default: 'rl_user',
    required: true 
  },
  active: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
