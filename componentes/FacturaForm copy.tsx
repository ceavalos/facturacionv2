'use client';

import React, { useState, useEffect } from 'react';
import { IFacturaEnc } from '../models/FacturaEnc';
import { IFacturaDet } from '../models/FacturaDet';
import { useRouter } from 'next/navigation';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import styles from '../styles/Modal.module.css';



interface Client {
  _id: string;
  nombre: string;
  tipoCliente: string;
  tipoFacturacion: string;
  dui?: string;
  numeroRegistro?: string;
  correoElectronico: string;
  companyId: string;
}
// Definir los tipos permitidos para los enums
type TipoCliente = 'NATURAL' | 'JURIDICA';
type TipoFacturacion = 'CONSUMIDOR_FINAL' | 'CREDITO_FISCAL';

export default function FacturaForm() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [facturaEnc, setFacturaEnc] = useState<Partial<IFacturaEnc>>({});
  const [facturaDet, setFacturaDet] = useState<IFacturaDet[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  // Dentro del componente, agrega estos estados
  const [filteredClientes, setFilteredClientes] = useState<Client[]>([]);
  const [searchClient, setSearchClient] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');

    // Validar token y compañía
    if (!token || !company) {
      console.error('No token or company found');
      setError('No token or company found');
      router.push("/login");
      return;
    }

    // Fetch clients and products from API
    fetch('/dashboard/clients/api', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'company': company
      },
    })
      .then(response => response.json())
      .then(data => setClientes(data));

    fetch('/dashboard/products/api', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'company': company
      },
    })
      .then(response => response.json())
      .then(data => setProductos(data));
  }, []);

  const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacturaEnc({ ...facturaEnc, [event.target.name]: event.target.value });
  };

  // Agrega esta función para filtrar clientes
  const filterClientes = (event: any) => {
    let query = event.query;
    let filtered: Client[] = [];

    if (query.length === 0) {
      filtered = clientes;
    } else {
      filtered = clientes.filter(cliente => {
        return cliente.nombre.toLowerCase().includes(query.toLowerCase());
      });
    }

    setFilteredClientes(filtered);
    setSearchClient(query);
  };


  // Add this function to handle client selection
  const handleClienteSeleccion = (event: any) => {
    const selectedClient = event.value;
    if (selectedClient) {
      setFacturaEnc({
        ...facturaEnc,
        clientId: selectedClient._id,
        companyId: selectedClient.companyId,
        tipoCliente: selectedClient.tipoCliente as TipoCliente,
        tipoFacturacion: selectedClient.tipoFacturacion as TipoFacturacion,
        nombre: selectedClient.nombre,
        dui: selectedClient.dui || '',
        numeroRegistro: selectedClient.numeroRegistro || '',
        correoElectronico: selectedClient.correoElectronico
      });
    }
  };

  const saveChanges = async (event: React.MouseEvent) => {
    event.preventDefault();
    // Resto de tu código
  };

  return (
    <div className={styles.containerFlex}>

      {/* Sección de Encabezado */}
      <div >

        {error && <div className={styles.error}>{error}</div>}

        <form >
          <h1 className={styles.title}>Nueva Factura</h1>

          <div className={styles.form_group}>
            <label htmlFor="buscarCliente">Buscar Cliente</label>
            <AutoComplete
              id="buscarCliente"
              value={searchClient}
              suggestions={filteredClientes}
              completeMethod={filterClientes}
              field="nombre"
              onChange={(e) => setSearchClient(e.value)}
              onSelect={handleClienteSeleccion}
              className={styles.form_input}
              placeholder="Buscar cliente..."
            />
          </div>


          <div className={styles.form_group}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={styles.form_input}
              value={facturaEnc.nombre || ''}
              onChange={handleClientChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="correoElectronico">Correo Electrónico</label>
            <input
              type="email"
              id="correoElectronico"
              name="correoElectronico"
              className={styles.form_input}
              value={facturaEnc.correoElectronico || ''}
              onChange={handleClientChange}
            />
          </div>


          <div className={styles.form_group}>
            <label htmlFor="tipoCliente">Tipo de Cliente</label>
            <select
              id="tipoCliente"
              name="tipoCliente"
              className={styles.form_input}
              value={facturaEnc.tipoCliente || ''}
              onChange={handleClientChange}
            >
              <option value="">Seleccione...</option>
              <option value="NATURAL">Natural</option>
              <option value="JURIDICA">Jurídica</option>
            </select>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="tipoFacturacion">Tipo de Facturación</label>
            <select
              id="tipoFacturacion"
              name="tipoFacturacion"
              className={styles.form_input}
              value={facturaEnc.tipoFacturacion || ''}
              onChange={handleClientChange}
            >
              <option value="">Seleccione...</option>
              <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
              <option value="CREDITO_FISCAL">Crédito Fiscal</option>
            </select>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="dui">DUI</label>
            <input
              type="text"
              id="dui"
              name="dui"
              className={styles.form_input}
              value={facturaEnc.dui || ''}
              onChange={handleClientChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="numeroRegistro">Número de Registro</label>
            <input
              type="text"
              id="numeroRegistro"
              name="numeroRegistro"
              className={styles.form_input}
              value={facturaEnc.numeroRegistro || ''}
              onChange={handleClientChange}
            />
          </div>

          <div className={styles.headerButtons} style={{ marginTop: '10px' }}>

            <Button
              label="Guardar Factura"
              icon="pi pi-times"
              onClick={(e) => saveChanges(e)}
              className="p-button-success"
            />
          </div>
        </form>
      </div>


        {/* Sección de Detalle */}
        
          <div className={styles.form_section}>
            <h1 className={styles.title}>Detalle de Factura</h1>
              {/* Aquí irá el detalle de la factura */}
          </div>
        
      </div>

  
  );


};


