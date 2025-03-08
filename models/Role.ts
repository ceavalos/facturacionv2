import mongoose, { Schema, Document } from 'mongoose';

export type RoleType = 'rl_admin' | 'rl_user';

export interface IRole extends Document {
  name: RoleType;
  description: string;
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    enum: ['rl_admin', 'rl_user'],
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
});

const Role = mongoose.models.Role || mongoose.model<IRole>('Role', roleSchema);
export default Role;
