"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/sideBarStyles.module.css';
import { Button } from 'primereact/button';   
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import companiApi from '../app/actions/company-Actions';

interface CompanyProps {
    _id: string;
    companyCode: string;
    companyName: string;
    nit: string;
    address: string;
    legalRepresentative: string;
    phone: string;
    createdAt: Date;
  }


export default function CompanySumary() {
    const [companies, setCompanies] = useState<CompanyProps[]>([]);
   
    const fetchCompanies = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('/dashboard/companies/api', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }

        const data = await response.json();
         setCompanies(data);        
      } catch (error) {
        console.error('Error fetching companies:', error);
        //throw new Error('Failed to fetch companies ');
      }
    };

    useEffect( () => {      
   
      fetchCompanies();
      
    }, []);

    // Calcular el índice de los elementos que se van a mostrar en la página actual
    const displayedCompanies = 
    console.log(companies)
    return (
      <div className={`${styles.container} ${styles.mt5}`}>
        <h2 className={styles.title}>Listado de Compañías</h2>
        <div className={`${styles.bgWhite} p-2`}>
          {companies.length > 0 ? (
            <DataTable value={companies} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="companyName" header="Nombre" style={{ width: '25%' }}></Column>
                <Column field="legalRepresentative" header="Representante" style={{ width: '25%' }}></Column>
                <Column field="phone" header="Teléfono" style={{ width: '25%' }}></Column>    
            </DataTable>
          ) : (
            <>
              <p>No se encontraron compañías.</p>
              <Button label="Click Me" icon="pi pi-check" className="p-button-raised p-button-rounded" />
            </>
          )}
        
        </div>
      </div>
      
    ); 

}



