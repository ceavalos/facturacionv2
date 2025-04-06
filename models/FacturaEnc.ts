import mongoose, { Schema, Document, model } from 'mongoose';

// Definir los tipos permitidos para los enums
type TipoCliente = 'NATURAL' | 'JURIDICA';
type TipoFacturacion = 'CONSUMIDOR_FINAL' | 'CREDITO_FISCAL';

// Definir la interfaz para TypeScript
interface IFacturaEnc extends Document {  
  companyId: mongoose.Types.ObjectId;
  clientId:  mongoose.Types.ObjectId;
  tipoCliente: TipoCliente,
  tipoFacturacion: TipoFacturacion,
  nombre: String,
  numeroRegistro: String,
  dui: String,
  correoElectronico: String,
  total_gravado: number,
  total_excento: number,
  total_iva: number,
  total_facturacion: number,
  createdAt?: Date;
}

// Expresión regular para validar correos electrónicos
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Definir el esquema en TypeScript
const facturaEncSchema = new Schema<IFacturaEnc>(
  {
    tipoCliente: {
      type: String,
      enum: ['NATURAL', 'JURIDICA'],
      required: true,
    },
    tipoFacturacion: {
      type: String,
      enum: ['CONSUMIDOR_FINAL', 'CREDITO_FISCAL'],
      required: true,
    },
    dui: {
      type: String,
      sparse: true,
      required: function() {
        return this.tipoCliente === 'NATURAL';
      }
    },
    nombre: {
      type: String,
      required: true
    },
    correoElectronico: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string): boolean {
          return emailRegex.test(v);
        },
        message: 'El correo electrónico no es válido',
      },
    },    
    numeroRegistro: {
      type: String,
      sparse: true,
      required: function() {
        return this.tipoFacturacion === 'CREDITO_FISCAL';
      }
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
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
facturaEncSchema.index({ companyId: 1 });
facturaEncSchema.index({ clientId: 1 });
facturaEncSchema.index({ dui: 1 }, { sparse: true });
facturaEncSchema.index({ numeroRegistro: 1 }, { sparse: true });

// Middleware de validación pre-save
facturaEncSchema.pre<IFacturaEnc>('save', function (next) {
  if (this.tipoCliente === 'NATURAL') {
    if (!this.dui || !this.nombre || !this.correoElectronico ) {
      return next(new Error('Los campos Dui, nombre y correo electronico son requeridos para personas naturales'));
    }
  } else if (this.tipoCliente === 'JURIDICA') {
    if (!this.numeroRegistro || !this.nombre || !this.correoElectronico  ) {
      return next(new Error('Número de registro, nombre y correo electrónico es requerido para personas jurídicas'));
    }
  }
  next();
});

// Exportar el modelo
const FacturaEnc = mongoose.models.FacturaEnc || model<IFacturaEnc>('FacturaEnc', facturaEncSchema);
export default FacturaEnc;
export type { IFacturaEnc };
