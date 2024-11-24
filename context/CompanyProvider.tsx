// /context/CompanyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo de los datos de la compañía
interface Company {
  companyCode: string;
  companyName: string;
  nit: string;
  legalRepresentative: string;
  address: string;
  phone: string;
}

// Definir el tipo para el contexto
interface CompanyContextType {
  company: Company | null;
  setCompany: (company: Company) => void;
  clearCompany: () => void;
}

// Crear un contexto con un valor inicial vacío
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Crear un hook para usar el contexto fácilmente
export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

// Crear el proveedor del contexto
interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [company, setCompanyState] = useState<Company | null>(null);

  const setCompany = (newCompany: Company) => {
    setCompanyState(newCompany);
  };

  const clearCompany = () => {
    setCompanyState(null);
  };

  return (
    <CompanyContext.Provider value={{ company, setCompany, clearCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};
