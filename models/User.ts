// /models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  nombre: string;
  numeroDeContacto: string;
  empresa: string;
  activo: boolean; // true si está activo, false si no
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  numeroDeContacto: { type: String, required: true },
  empresa: { type: String, required: true },
  activo: { type: Boolean, default: false }, // Valor por defecto es false (no activo)
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
