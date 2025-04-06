import mongoose, { Schema, Document, model } from 'mongoose';

// Definir los tipos permitidos para los enums
type TipoCliente = 'NATURAL' | 'JURIDICA';
type TipoFacturacion = 'CONSUMIDOR_FINAL' | 'CREDITO_FISCAL';

// Definir la interfaz para TypeScript
interface IClient extends Document {
  tipoCliente: TipoCliente;
  tipoFacturacion: TipoFacturacion;
  nit?: string;
  dui?: string;
  nombre?: string;
  correoElectronico?: string;
  actividadEconomica?: string;
  numeroRegistro?: string;
  companyId: mongoose.Types.ObjectId;
}

// Expresión regular para validar correos electrónicos
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Definir el esquema en TypeScript
const clientSchema = new Schema<IClient>(
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
    nit: {
      type: String,
      sparse: true,
    },
    dui: {
      type: String,
      sparse: true,
    },
    nombre: {
      type: String,
    },
    correoElectronico: {
      type: String,
      validate: {
        validator: function (v: string): boolean {
          return emailRegex.test(v);
        },
        message: 'El correo electrónico no es válido',
      },
    },
    actividadEconomica: {
      type: String,
    },
    numeroRegistro: {
      type: String,
      sparse: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índices
clientSchema.index({ companyId: 1 });
clientSchema.index({ nit: 1 }, { sparse: true });
clientSchema.index({ dui: 1 }, { sparse: true });
clientSchema.index({ numeroRegistro: 1 }, { sparse: true });

// Middleware de validación pre-save
clientSchema.pre<IClient>('save', function (next) {
  if (this.tipoCliente === 'NATURAL') {
    if (!this.nit || !this.dui || !this.nombre || !this.correoElectronico || !this.actividadEconomica) {
      return next(new Error('Todos los campos son requeridos para personas naturales'));
    }
  } else if (this.tipoCliente === 'JURIDICA') {
    if (!this.numeroRegistro) {
      return next(new Error('Número de registro es requerido para personas jurídicas'));
    }
  }
  next();
});

// Exportar el modelo
const Client = mongoose.models.Client || model<IClient>('Client', clientSchema);
export default Client;
