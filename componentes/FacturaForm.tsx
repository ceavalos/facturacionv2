'use client';

import React, { useState, useEffect } from 'react';
import { IFacturaEnc } from '../models/FacturaEnc';
import { IFacturaDet } from '../models/FacturaDet';
import { useRouter } from 'next/navigation';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import styles from '../styles/Modal.module.css';

//
import FacturaHeader from "./FacturaHeader";
import FacturaDetalle from "./FacturaDetalle";
import ProductoModal from './ProductoModal';

// Definir los tipos permitidos para los enums
import { Client } from '@/app/types/interfaces';
import { tipoClienteOptions as TipoCliente, tipoFacturacionOptions as TipoFacturacion } from '@/app/types/constantes';

// type TipoCliente = 'NATURAL' | 'JURIDICA';
// type TipoFacturacion = 'CONSUMIDOR_FINAL' | 'CREDITO_FISCAL';

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
  //
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleProductos, setDetalleProductos] = useState<ProductoDetalle[]>([]);


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

// Añade esta función para manejar el guardado de productos
const handleSaveProducto = (producto: ProductoDetalle) => {
  setDetalleProductos([...detalleProductos, producto]);
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
      <div className={styles.form_section}>
        <FacturaHeader
          error={error}
          searchClient={searchClient}
          filteredClientes={filteredClientes}
          facturaEnc={facturaEnc}
          filterClientes={filterClientes}
          handleClienteSeleccion={handleClienteSeleccion}
          handleClientChange={handleClientChange}
          saveChanges={saveChanges}
          setSearchClient={setSearchClient}
          setModalVisible={setModalVisible}
        />
      </div>


      {/* Sección de Detalle */}

      <div className={styles.form_section}>
        <h1 className={styles.title}>Detalle de Factura</h1>
        {/* Aquí irá el detalle de la factura */}
        <FacturaDetalle />
      </div>

      <ProductoModal
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
        onSave={handleSaveProducto}
        tipoFacturacion={facturaEnc.tipoFacturacion}
      />
    </div>
  );


};


