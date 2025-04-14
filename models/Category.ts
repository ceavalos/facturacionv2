import mongoose, { Schema, Document } from 'mongoose';
import Company from './Company';

export interface ICategory extends Document {
  company: mongoose.Types.ObjectId;
  code: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'La compañía es requerida']
  },
  code: {
    type: String,
    required: [true, 'El código es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Crear un índice compuesto único para company y code
categorySchema.index({ company: 1, code: 1 }, { unique: true });

// Al final del archivo Category.ts
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;