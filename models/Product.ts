import mongoose from 'mongoose';
import Category from './Category';
import Company from './Company';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es requerida']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'La empresa es requerida']
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Deshabilitar la versión __v
  versionKey: false,
  // Transformar el documento antes de enviarlo
  toJSON: {
    transform: function(doc, ret) {
      // Convertir _id a id
      //ret.id = ret._id;
      ret._id = ret._id.toString(); // Ensure _id is a string
      //delete ret._id;
      delete ret.__v;
    }
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
