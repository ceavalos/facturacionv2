import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  companyCode: string;
  companyName: string;
  nit: string;
  address: string;
  legalRepresentative: string;
  phone: string;
  createdAt: Date;
}

const companySchema = new Schema<ICompany>({
  companyCode: { type: String, required: true },
  companyName: { type: String, required: true },
  nit: { type: String, required: true },
  address: { type: String, required: true },
  legalRepresentative: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Company || mongoose.model<ICompany>('Company', companySchema);
