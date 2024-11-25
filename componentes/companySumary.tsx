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
//
import companiApi from '../app/actions/company-Actions';
import { now } from 'mongoose';

type CompanyProps = {
  _id: string;
  companyCode: string;
  companyName: string;
  nit: string;
  address: string;
  legalRepresentative: string;
  phone: string;
  createdAt: Date;
  active: Boolean;
}

const ciavacia: CompanyProps = {
  _id: '', companyCode: '',
  companyName: '',
  nit: '',
  address: '',
  legalRepresentative: '',
  phone: '',
  createdAt: new Date(),
  active: true
}

export default function CompanySumary() {
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyProps>(ciavacia);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerTitle, setheaderTitle] = useState('')
  const [title, setTitle] = useState('Maintenance of Companies')

  //
  const router = useRouter();

  // Abrir modal para crear o editar
  const openDialog = (companyToEdit: CompanyProps | null = null) => {
    setIsEditMode(!!companyToEdit);
    //
    console.log(!!companyToEdit)
    if (!!companyToEdit) {
      setSelectedCompany(companyToEdit)
      setheaderTitle("Edición de compañias");
    } else {
      setheaderTitle("Creación de compañias");
      setSelectedCompany(ciavacia);

    }
    setEditDialogVisible(true);

  };

  const activeOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ];

  // Guardar los cambios
  const saveChanges = () => {
    if (selectedCompany) {
      // setCompanies((prevCompanies) =>
      //   prevCompanies.map((comp) =>
      //     comp._id === selectedCompany._id ? selectedCompany : comp
      //   )
      // );

      if (isEditMode) {
        /*setCompanies((prevCompanies) =>
         prevCompanies.map((c) => (c._id === company._id ? company : c))         
       );*/
      } else {
        /*setCompanies((prevCompanies) => [
          ...prevCompanies,
          { ...company, _id: prevCompanies.length + 1 },
        ]);*/
      }

    }
    setEditDialogVisible(false);
  };

  // Renderizar el botón de editar
  const actionBodyTemplate = (rowData: CompanyProps) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        onClick={() => openDialog(rowData)}
      />
    );
  };

  const fetchCompanies = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      router.push("/login")
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
        router.push("/login")
      }

      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      router.push("/login")
    }
  };

  useEffect(() => {

    fetchCompanies();

  }, []);

  return (
    <div>
      <div className={styles.title}> {title} </div>
      <Button
        label="Agregar Compañía"
        icon="pi pi-plus"
        onClick={() => openDialog()}
        className={styles.btn_new}
      />

      {companies.length > 0 ? (
        <div>
          <DataTable value={companies} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="companyName" header="Company Name" style={{ width: '25%' }}></Column>
            <Column field="legalRepresentative" header="Legal Representative" style={{ width: '25%' }}></Column>
            <Column field="phone" header="Phone" style={{ width: '25%' }}></Column>
            <Column header="Editar" body={actionBodyTemplate} style={{ width: '25%' }}></Column>
          </DataTable>

          {/* Ventana Modal */}
          <Dialog
            header={headerTitle}
            visible={editDialogVisible}
            style={{ width: '90vw', height: '100vw', padding: '1.5rem' }}
            onHide={() => setEditDialogVisible(false)}
          >
            <div className={styles.company_form}>
              <div className={styles.form_group}>
                <label htmlFor="name">Company Name</label>
                <InputText
                  id="companyName"
                  className={styles.form_input}
                  value={selectedCompany.companyName}
                  onChange={(e) => setSelectedCompany({ ...selectedCompany, companyName: e.target.value })}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="address">Dirección</label>
                <InputText
                  id="address"
                  className={styles.form_input}
                  value={selectedCompany.address}
                  onChange={(e) => setSelectedCompany({ ...selectedCompany, address: e.target.value })}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="nit">NIT</label>
                <InputText
                  id="nit"
                  className={styles.form_input}
                  value={selectedCompany.nit}
                  onChange={(e) => setSelectedCompany({ ...selectedCompany, nit: e.target.value })}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="legalRepresentative">Representante Legal</label>
                <InputText
                  id="legalRepresentative"
                  className={styles.form_input}
                  value={selectedCompany.legalRepresentative}
                  onChange={(e) =>
                    setSelectedCompany({ ...selectedCompany, legalRepresentative: e.target.value })
                  }
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="phone">Phone</label>
                <InputText
                  id="phone"
                  className={styles.form_input}
                  value={selectedCompany.phone}
                  onChange={(e) => setSelectedCompany({ ...selectedCompany, phone: e.target.value })}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="active">Estado</label>
                <Dropdown
                  id="active"
                  value={selectedCompany.active}
                  options={activeOptions}
                  onChange={(e) => setSelectedCompany({ ...selectedCompany, active: e.target.value })}
                  placeholder="Seleccione un estado"
                />
              </div>


              <div className={styles.btn_save_cancel}>
                <Button
                  label="Guardar"
                  icon="pi pi-check"
                  className="p-button-success"
                //onClick={saveCompany}
                />
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  className="p-button-secondary p-ml-2"
                  onClick={() => setEditDialogVisible(false)}
                />
              </div>
            </div>
          </Dialog>
        </div>
      ) : (
        <>
          <p>No se encontraron compañías.</p>
        </>
      )
      }
    </div >
  );
}



