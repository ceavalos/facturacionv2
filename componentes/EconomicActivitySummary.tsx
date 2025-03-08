"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/navigation';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

type EconomicActivityProps = {
  _id: string;
  code: string;
  description: string;
  active: boolean;
}

const emptyActivity: EconomicActivityProps = {
  _id: '',
  code: '',
  description: '',
  active: true
}

export default function EconomicActivitySummary() {
  const [activities, setActivities] = useState<EconomicActivityProps[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<EconomicActivityProps>(emptyActivity);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Mantenimiento de Actividades Económicas');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<any>(null);

  const router = useRouter();

  const activeOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ];

  // Abrir modal para crear o editar
  const openDialog = (activityToEdit: EconomicActivityProps | null = null) => {
    setError('');
    setIsEditMode(!!activityToEdit);
    if (activityToEdit) {
      setSelectedActivity(activityToEdit);
      setHeaderTitle("Editar Actividad Económica");
    } else {
      setSelectedActivity(emptyActivity);
      setHeaderTitle("Crear Actividad Económica");
    }
    setEditDialogVisible(true);
  };

  // Guardar cambios
  const saveChanges = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setError('No token found');
      router.push("/login");
      return;
    }

    try {
      const url = isEditMode
        ? '/dashboard/economicactivities/api'
        : '/dashboard/economicactivities/api';

      const method = isEditMode ? 'PUT' : 'POST';
      //console.log(selectedActivity);
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedActivity),
      });

      if (!response.ok) {
        throw new Error(`Error al ${isEditMode ? 'actualizar' : 'crear'} actividad economica`);
      }
      //console.log(response)
      const updatedActivity = await response.json();
      //console.log(updatedActivity)
      setActivities((prevActivities) => {
        if (isEditMode) {
          return prevActivities.map((activity) =>
            activity._id === selectedActivity._id ?
              selectedActivity : 
              activity
          );
        } else {
          return [...prevActivities, selectedActivity];
        }
      });

      setEditDialogVisible(false);
      toast?.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: `Actividad económica ${isEditMode ? 'actualizada' : 'creada'} correctamente`,
        life: 3000
      });
    } catch (error) {
      setError('Error al guardar actividad económica: ' + error);
      console.error('Error al guardar actividad económica:', error);
    }
  };

  // Obtener lista de actividades económicas
  const fetchActivities = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setError('No token found');
      router.push("/login");
      return;
    }

    try {
      const response = await fetch('/dashboard/economicactivities/api', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener actividades económicas');
      }

      const data = await response.json();
      setActivities(data);
    } catch (error) {
      setError('Error al obtener actividades económicas: ' + error);
      console.error('Error al obtener actividades económicas:', error);
    }
  };

  // Manejar la carga del archivo CSV
  const handleFileUpload = async (event: any) => {
    const file = event.files[0];
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      setError('No token found');
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/dashboard/economicactivities/api/import', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al importar archivo');
      }

      const result = await response.json();
      toast?.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: `Se importaron ${result.count} actividades económicas`,
        life: 3000
      });

      // Actualizar la lista de actividades
      fetchActivities();
    } catch (error) {
      toast?.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al importar archivo: ' + error,
        life: 3000
      });
      console.error('Error al importar archivo:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Renderizar botón de editar
  const actionBodyTemplate = (rowData: EconomicActivityProps) => (
    <Button
      icon="pi pi-pencil"
      className="p-button-rounded p-button-success"
      onClick={() => openDialog(rowData)}
    />
  );

  return (
    <div className={styles.container}>
      <Toast ref={toast} />
      
      <div className={styles.header}>
        <h1>{headerTitle}</h1>
        <div className={styles.headerButtons}>
          <FileUpload
            mode="basic"
            accept=".csv"
            maxFileSize={1000000}
            customUpload
            uploadHandler={handleFileUpload}
            auto
            chooseLabel="Importar CSV"
            className="mr-2"
          />
          <Button 
            label="Nueva Actividad" 
            icon="pi pi-plus" 
            onClick={() => openDialog()} 
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <DataTable value={activities} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Código" />
        <Column field="description" header="Descripción" />
        <Column 
          field="active" 
          header="Estado Activo" 
          //  body={(rowData) => rowData.active ? 'Activo' : 'Inactivo'}
        />
        <Column body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        visible={editDialogVisible}
        onHide={() => setEditDialogVisible(false)}
        header={headerTitle}
        className={styles.dialog}
      >
         <div className={styles.company_form}>

         
       <div className={styles.form_group}>
          <label htmlFor="code">Código</label>
          <InputText
            id="code"
            value={selectedActivity.code}
            onChange={(e) => setSelectedActivity({ ...selectedActivity, code: e.target.value })}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            value={selectedActivity.description}
            onChange={(e) => setSelectedActivity({ ...selectedActivity, description: e.target.value })}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="active">Estado</label>
          <Dropdown
            id="active"
            value={selectedActivity.active}
            options={activeOptions}
            onChange={(e) => setSelectedActivity({ ...selectedActivity, active: e.value })}
          />
        </div>

        <div  className={styles.btn_save_cancel}>
          <Button label="Guardar" onClick={saveChanges} />
          <Button 
            label="Cancelar" 
            className="p-button-secondary" 
            onClick={() => setEditDialogVisible(false)} 
          />
        </div>
        </div>
      </Dialog>
    </div>
  );
}
