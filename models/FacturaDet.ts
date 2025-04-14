import mongoose, { Schema, Document, model } from 'mongoose';

// Definir la interfaz para TypeScript
interface IFacturaDet extends Document {
  companyId: mongoose.Types.ObjectId;
  FacturaEnc: mongoose.Types.ObjectId;
  Category: mongoose.Types.ObjectId;
  Product: mongoose.Types.ObjectId;
  cantidad: number,
  precio_unitario: number,
  total_gravado: number,
  total_excento: number,
  total_iva: number,
  total_facturacion: number,
  createdAt?: Date;
  productName?: string; // Add this if you want to type the populated fields
  categoryDescription?: string; // Add this if you want to type the populated fields
}

// Definir el esquema en TypeScript
const facturaDetSchema = new Schema<IFacturaDet>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    FacturaEnc: {
      type: Schema.Types.ObjectId,
      ref: 'FacturaEnc',
      required: true,
    },
    Category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    Product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    precio_unitario: {
      type: Number,
      required: true,
    },
    total_gravado: {
      type: Number,
      required: true,
    },
    total_excento: {
      type: Number,
      required: true,
    },
    total_iva: {
      type: Number,
      required: true,
    },
    total_facturacion: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

// Índices
facturaDetSchema.index({ companyId: 1 });
facturaDetSchema.index({ FacturaEnc: 1 });
facturaDetSchema.index({ Product: 1 });



// Exportar el modelo
const FacturaDet = mongoose.models.FacturaDet || model<IFacturaDet>('FacturaDet', facturaDetSchema);

// Example query using populate
FacturaDet.find()
  .populate('Product', 'name') // Populate the 'name' field from the Product collection
  .populate('Category', 'description') // Populate the 'description' field from the Category collection
  .exec();

export default FacturaDet;
export type { IFacturaDet };
