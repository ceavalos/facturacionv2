'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { useRouter } from 'next/navigation';

import { tipoClienteOptions, tipoFacturacionOptions } from '@/app/types/constantes';


type EconomicActivityType = {
  _id: string;
  code: string;
  description: string;
}

type ClientType = {
  _id: string;
  tipoCliente: 'NATURAL' | 'JURIDICA';
  tipoFacturacion: 'CONSUMIDOR_FINAL' | 'CREDITO_FISCAL';
  nit?: string;
  dui?: string;
  nombre?: string;
  correoElectronico?: string;
  actividadEconomica?: string;
  actividadEconomicaId?: string;
  numeroRegistro?: string;
  companyId: string;
  createdAt: Date;
}

const clientEmpty: ClientType = {
  _id: '',
  tipoCliente: 'NATURAL',
  tipoFacturacion: 'CONSUMIDOR_FINAL',
  nit: '',
  dui: '',
  nombre: '',
  correoElectronico: '',
  actividadEconomica: '',
  actividadEconomicaId: '',
  numeroRegistro: '',
  companyId: '',
  createdAt: new Date()
}

export default function ClientForm() {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientType>(clientEmpty);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [title, setTitle] = useState('Mantenimiento de Clientes');
  const [error, setError] = useState('');
  const [economicActivities, setEconomicActivities] = useState<EconomicActivityType[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<EconomicActivityType[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<EconomicActivityType | null>(null);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const router = useRouter();

  const openDialog = (clientToEdit: ClientType | null = null) => {
    const company = localStorage.getItem('company') || '';
    if (clientToEdit) {
      setSelectedClient({
        ...clientToEdit
      });
      setHeaderTitle("Edición de Cliente");
      setIsEditMode(true);
      
      // Find and set the selected activity if it exists
      if (clientToEdit.actividadEconomicaId) {
        const activity = economicActivities.find(act => act._id === clientToEdit.actividadEconomicaId);
        if (activity) {
          setSelectedActivity(activity);
        }
      }
    } else {
      setSelectedClient({ ...clientEmpty, companyId: company });
      setSelectedActivity(null);
      setHeaderTitle("Creación de Cliente");
      setIsEditMode(false);
    }
    setError('');
    setEditDialogVisible(true);
  };

  const validateForm = () => {
    // Validación de correo electrónico
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!selectedClient.correoElectronico?.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    if (!emailRegex.test(selectedClient.correoElectronico)) {
      setError('El formato del correo electrónico no es válido');
      return false;
    }

    if (!selectedClient.nombre?.trim()) {
      setError('El nombre es requerido');
      return false;
    }

    if (selectedClient.tipoFacturacion === 'CREDITO_FISCAL') {
      if (!selectedClient.nit?.trim()) {
        setError('El NIT es requerido para facturación de Crédito Fiscal');
        return false;
      }
      if (!selectedClient.numeroRegistro?.trim()) {
        setError('El número de registro es requerido para facturación de Crédito Fiscal');
        return false;
      }
      if (!selectedClient.actividadEconomica?.trim()) {
        setError('La actividad económica es requerida para facturación de Crédito Fiscal');
        return false;
      }
    }

    if (selectedClient.tipoCliente === 'NATURAL' && !selectedClient.dui?.trim()) {
      setError('El DUI es requerido para personas naturales');
      return false;
    }

    setError('');
    return true;
  };

  const saveChanges = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');
    setError('');
    
    if (!token || !company) {
      console.error('No token or company found');
      setError('No token or company found');
      router.push("/login");
      return;
    }

    try {
      const url = `/dashboard/clients/api`;
      const method = isEditMode ? 'PUT' : 'POST';

      const { _id, ...clientData } = selectedClient;
      const clientToSave = isEditMode 
        ? { ...selectedClient, companyId: company }
        : { ...clientData, companyId: company };

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `application/json`,
          'company': company
        },
        body: JSON.stringify(clientToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditMode ? 'update' : 'create'} client`);
      }

      const updatedClient = await response.json();

      setClients((prevClients) => {
        if (isEditMode) {
          return prevClients.map((client) =>
            client._id === selectedClient._id ? updatedClient.client : client
          );
        } else {
          return [...prevClients, updatedClient.client];
        }
      });

      setEditDialogVisible(false);
    } catch (error) {
      setError('Error saving client: ' + error);
      console.error('Error saving client:', error);
    }
  };

  const fetchEconomicActivities = async () => {
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');

    if (!token || !company) {
      console.error('No token or company found');
      setError('No token or company found');
      router.push("/login");
      return;
    }

    setLoadingActivities(true);
    try {
      const response = await fetch('/dashboard/economicactivities/api', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'company': company
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch economic activities');
      }

      const data = await response.json();
      setEconomicActivities(data);
    } catch (error) {
      console.error('Error fetching economic activities:', error);
      setError('Error fetching economic activities: ' + error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const searchActivities = (event: { query: string }) => {
    let filtered: EconomicActivityType[];
    if (!event.query.trim()) {
      filtered = [...economicActivities];
    } else {
      const searchText = event.query.toLowerCase();
      filtered = economicActivities.filter(activity => 
        activity.description.toLowerCase().includes(searchText) ||
        activity.code.toLowerCase().includes(searchText)
      );
    }
    setFilteredActivities(filtered);
  };

  const onActivitySelect = (e: { value: EconomicActivityType }) => {
    setSelectedActivity(e.value);
    setSelectedClient({
      ...selectedClient,
      actividadEconomica: e.value.description,
      actividadEconomicaId: e.value._id
    });
  };

  const activityTemplate = (activity: EconomicActivityType) => {
    return (
      <div className={styles.activity_item}>
        <div className={styles.activity_code}>{activity.code}</div>
        <div className={styles.activity_description}>{activity.description}</div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: ClientType) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        onClick={() => openDialog(rowData)}
      />
    );
  };

  const fetchClients = async () => {
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');

    if (!token || !company) {
      console.error('No token or company found');
      setError('No token or company found');
      router.push("/login");
      return;
    }

    try {
      const response = await fetch('/dashboard/clients/api', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `application/json`,
          'company': company
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }

      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError('Error fetching clients: ' + error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchClients();
    fetchEconomicActivities();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>

      <div className={styles.headerButtons}>
        <Button 
          label="Nuevo Cliente" 
          icon="pi pi-plus" 
          onClick={() => openDialog()} 
          className="p-button-success"
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <DataTable value={clients} tableStyle={{ minWidth: '50rem' }}>
      <Column field="nombre" header="Nombre" />
        <Column field="tipoCliente" header="Tipo de Cliente" body={(rowData) => 
          rowData.tipoCliente === 'NATURAL' ? 'Persona Natural' : 'Persona Jurídica'
        } />
        <Column field="tipoFacturacion" header="Tipo de Facturación" body={(rowData) =>
          rowData.tipoFacturacion === 'CONSUMIDOR_FINAL' ? 'Consumidor Final' : 'Crédito Fiscal'
        } />
       
        <Column field="correoElectronico" header="Correo Electrónico" />
        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
      </DataTable>

      <Dialog 
        visible={editDialogVisible} 
        onHide={() => setEditDialogVisible(false)}
        header={headerTitle}
        modal
        className="p-fluid"
        style={{ width: '50vw' }}
      >
        <div className={styles.dialog_content}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.company_form}>
            
            <div className={styles.form_group}>
              <label htmlFor="nombre">Nombre*</label>
              <InputText
                id="nombre"
                value={selectedClient.nombre}
                onChange={(e) => setSelectedClient({ ...selectedClient, nombre: e.target.value })}
                className={`${styles.form_input} ${!selectedClient.nombre?.trim() && error ? styles.input_error : ''}`}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="tipoCliente">Tipo de Cliente</label>
              <Dropdown
                id="tipoCliente"
                value={selectedClient.tipoCliente}
                options={tipoClienteOptions}
                onChange={(e) => setSelectedClient({ ...selectedClient, tipoCliente: e.value })}
                className={styles.form_input}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="tipoFacturacion">Tipo de Facturación</label>
              <Dropdown
                id="tipoFacturacion"
                value={selectedClient.tipoFacturacion}
                options={tipoFacturacionOptions}
                onChange={(e) => setSelectedClient({ ...selectedClient, tipoFacturacion: e.value })}
                className={styles.form_input}
              />
            </div>           

            <div className={styles.form_group}>
              <label htmlFor="correoElectronico">Correo Electrónico*</label>
              <InputText
                id="correoElectronico"
                value={selectedClient.correoElectronico}
                onChange={(e) => setSelectedClient({ ...selectedClient, correoElectronico: e.target.value })}
                className={`${styles.form_input} ${!selectedClient.correoElectronico?.trim() && error ? styles.input_error : ''}`}
              />
            </div>

            {selectedClient.tipoCliente === 'NATURAL' && (
              <div className={styles.form_group}>
                <label htmlFor="dui">DUI*</label>
                <InputText
                  id="dui"
                  value={selectedClient.dui}
                  onChange={(e) => setSelectedClient({ ...selectedClient, dui: e.target.value })}
                  className={`${styles.form_input} ${!selectedClient.dui?.trim() && error ? styles.input_error : ''}`}
                />
              </div>
            )}

            {selectedClient.tipoFacturacion === 'CREDITO_FISCAL' && (
              <>
                <div className={styles.form_group}>
                  <label htmlFor="nit">NIT*</label>
                  <InputText
                    id="nit"
                    value={selectedClient.nit}
                    onChange={(e) => setSelectedClient({ ...selectedClient, nit: e.target.value })}
                    className={`${styles.form_input} ${!selectedClient.nit?.trim() && error ? styles.input_error : ''}`}
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="numeroRegistro">Número de Registro*</label>
                  <InputText
                    id="numeroRegistro"
                    value={selectedClient.numeroRegistro}
                    onChange={(e) => setSelectedClient({ ...selectedClient, numeroRegistro: e.target.value })}
                    className={`${styles.form_input} ${!selectedClient.numeroRegistro?.trim() && error ? styles.input_error : ''}`}
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="actividadEconomica">Actividad Económica*</label>
                  <AutoComplete
                    id="actividadEconomica"
                    value={selectedActivity}
                    suggestions={filteredActivities}
                    completeMethod={searchActivities}
                    field="description"
                    dropdown
                    forceSelection
                    itemTemplate={activityTemplate}
                    onChange={(e) => setSelectedActivity(e.value)}
                    onSelect={onActivitySelect}
                    className={`${styles.form_input} ${!selectedClient.actividadEconomica?.trim() && error ? styles.input_error : ''}`}
                    placeholder="Buscar por código o descripción..."
                    loading={loadingActivities}
                    delay={300}
                    minLength={2}
                  />
                </div>
              </>
            )}
          </div>

          <div className={`${styles.btn_save_cancel} ${styles.mt_2}`}>
            <Button
              label={isEditMode ? "Actualizar" : "Guardar"}
              icon="pi pi-check"
              onClick={saveChanges}
              className="p-button-success"
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setEditDialogVisible(false)}
              className="p-button-danger"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
