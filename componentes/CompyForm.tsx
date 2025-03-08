'use client';

import { useState } from 'react';
import styles from '../styles/sharedStyles.module.css'  // Importa el archivo de estilos CSS


export default function CompanyForm( ) {
  
  const [company, setCompany] = useState({
    companyCode: '',
    companyName: '',
    nit: '',
    legalRepresentative: '',
    address: '',
    phone: '',
  });
    const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('User is not authenticated');
      return;
    }
    console.log(JSON.stringify(company))
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(company),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create company');
      }
      console.log(message);
      setMessage('Company created successfully');
      setCompany({
        companyCode: '',
        companyName: '',
        nit: '',
        legalRepresentative: '',
        address: '',
        phone: '',
      });
    } catch (error : any) {
      setMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Register Company</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="companyCode"
            placeholder="Company Code"
            className={styles.inputField}
            value={company.companyCode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className={styles.inputField}
            value={company.companyName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nit"
            placeholder="NIT"
            className={styles.inputField}
            value={company.nit}
            onChange={handleChange}
          />
          <input
            type="text"
            name="legalRepresentative"
            placeholder="Legal Representative"
            className={styles.inputField}
            value={company.legalRepresentative}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className={styles.inputField}
            value={company.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className={styles.inputField}
            value={company.phone}
            onChange={handleChange}
          />
            {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Create Company</button>
        </form>        
        {message && <p className={styles.error}>{message}</p>}
      </div>
    </div>
  );
}
