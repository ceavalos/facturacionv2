// /models/EconomicActivity.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEconomicActivity extends Document {
  code: string;
  description: string;
  active: boolean;
}

const economicActivitySchema = new Schema<IEconomicActivity>({
  code: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  active: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const EconomicActivity = mongoose.models.EconomicActivity || mongoose.model<IEconomicActivity>('EconomicActivity', economicActivitySchema);
export default EconomicActivity;
