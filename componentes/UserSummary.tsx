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
import { RoleType } from '../models/Role';

type CompanyProps = {
  _id: string;
  companyName: string;
}

type UserProps = {
  _id: string;
  username: string;
  password: string;
  name: string;
  contactNumber: string;
  active: boolean;
  company: CompanyProps;
  role: RoleType;
}

const emptyUser: UserProps = {
  _id: '',
  username: '',
  password: '',
  name: '',
  contactNumber: '',
  active: true,
  company: { _id: '', companyName: '' },
  role: 'rl_user'
}

export default function UserSummary() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProps>(emptyUser);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Mantenimiento de Usuarios');
  const [error, setError] = useState('');

  const router = useRouter();

  const activeOptions = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false },
  ];

  const roleOptions = [
    { label: 'Administrador', value: 'rl_admin' },
    { label: 'Usuario', value: 'rl_user' },
  ];

  // Abrir modal para crear o editar
  const openDialog = (userToEdit: UserProps | null = null) => {
    setError('');
    setIsEditMode(!!userToEdit);
    if (userToEdit) {
      setSelectedUser(userToEdit);
      setHeaderTitle("Editar Usuario");
    } else {
      setSelectedUser(emptyUser);
      setHeaderTitle("Crear Usuario");
    }
    setEditDialogVisible(true);
  };

  // Guardar cambios en usuario
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
        ? '/dashboard/users/api'  // Ruta para actualizar (PUT)
        : '/dashboard/users/api'; // Ruta para crear (POST)

      const method = isEditMode ? 'PUT' : 'POST';
      console.log(selectedUser)
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      if (!response.ok) {
        throw new Error(`Error al ${isEditMode ? 'actualizar' : 'crear'} usuario`);
      }

      const updatedUser = await response.json();
      console.log(updatedUser);
      console.log(selectedUser);
      setUsers((prevUsers) => {
        if (isEditMode) {
          return prevUsers.map((user) =>
            user._id === selectedUser._id
              ? {...updatedUser.user
                //...updatedUser.user
                ,company: selectedUser.company // Evitar errores si company es null
                //,company: companies.find(c => c._id === updatedUser.user.company._id) || { _id: '', companyName: 'Desconocido' }
              }
              : user
          );
        } else {
          return [...prevUsers, updatedUser.user];
        }
      });

      setEditDialogVisible(false);
    } catch (error) {
      setError('Error al guardar usuario:' + error);
      console.error('Error al guardar usuario:', error);
    }
  };

  // Obtener la lista de usuarios
  const fetchUsers = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setError('No token found');
      router.push("/login");
      return;
    }

    try {
      const response = await fetch('/dashboard/users/api', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const data = await response.json();

      // Transformamos para asegurarnos que `company` es un objeto
      const transformedUsers = data.map((user: any) => ({
        ...user,
          company: user.company ? user.company : { _id: '', companyName: 'Desconocido' } // Evitar errores si company es null
      }));

      setUsers(transformedUsers);
    } catch (error) {
      setError('Error al obtener usuarios:' + error);
      console.error('Error al obtener usuarios:', error);
    }
  };

  // Obtener la lista de empresas
  const fetchCompanies = async () => {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setError('No token found');
      router.push("/login");
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
        throw new Error('Error al obtener empresas');
      }

      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      setError('Error al obtener empresas:' + error);
      console.error('Error al obtener empresas:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCompanies();
  }, []);

  // Renderizar botón de editar
  const actionBodyTemplate = (rowData: UserProps) => (
    <Button
      icon="pi pi-pencil"
      className="p-button-rounded p-button-success"
      onClick={() => openDialog(rowData)}
    />
  );

  return (
    <div>
      <div className={styles.title}>Mantenimiento de Usuarios</div>
      <Button
        label="Agregar Usuario"
        icon="pi pi-plus"
        onClick={() => openDialog()}
        className={styles.btn_new}
      />

      {users.length > 0 ? (
        <DataTable value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="username" header="Username" style={{ width: '20%' }}></Column>
          <Column field="name" header="Nombre" style={{ width: '20%' }}></Column>
          <Column field="contactNumber" header="Contacto" style={{ width: '20%' }}></Column>
          <Column field="company.companyName" header="Empresa" style={{ width: '20%' }}></Column>
          <Column field="role" header="Rol" body={(rowData) => roleOptions.find(opt => opt.value === rowData.role)?.label || rowData.role} style={{ width: '20%' }}></Column>
          <Column field="active" header="Estado" body={(rowData) => rowData.active ? 'Activo' : 'Inactivo'} style={{ width: '20%' }}></Column>
          <Column header="Editar" body={actionBodyTemplate} style={{ width: '20%' }}></Column>
        </DataTable>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}

      {/* Modal para crear/editar usuario */}
      <Dialog
        header={headerTitle}
        visible={editDialogVisible}
        style={{ width: '50vw' }}
        onHide={() => setEditDialogVisible(false)}
      >
        <div className={styles.company_form}>

          <div className={styles.form_group}>
            <label htmlFor="name">Nombre completo</label>
            <InputText
              id="name"
              className={styles.form_input}
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="username">usuario ingreso</label>
            <InputText
              id="username"
              className={styles.form_input}
              value={selectedUser.username}
              onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="contactNumber">Numero contacto</label>
            <InputText
              id="contactNumber"
              className={styles.form_input}
              value={selectedUser.contactNumber}
              onChange={(e) => setSelectedUser({ ...selectedUser, contactNumber: e.target.value })}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Clave</label>
            <InputText
              id="password"
              type="password"
              className={styles.form_input}
              value={selectedUser.password}
              onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="role">Rol</label>
            <Dropdown
              id="role"
              value={selectedUser.role}
              options={roleOptions}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.value })}
              placeholder="Seleccione un rol"
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="active">Estado</label>
            <Dropdown
              id="active"
              value={selectedUser.active}
              options={activeOptions}
              onChange={(e) => setSelectedUser({ ...selectedUser, active: e.value })}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="company">Empresa</label>
            <Dropdown
              id="company"
              value={selectedUser.company?._id}
              options={companies.map(c => ({ label: c.companyName, value: c._id }))}
              onChange={(e) => {
                const selectedCompany = companies.find(c => c._id === e.value);
                setSelectedUser({
                  ...selectedUser,
                  company: selectedCompany ? selectedCompany : { _id: '', companyName: '' }
                });
              }}
              placeholder="Seleccione una empresa"
            />
          </div>
          <div>
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div className={styles.btn_save_cancel}>
            <Button label="Guardar" icon="pi pi-check" className="p-button-success" onClick={saveChanges} />
            <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={() => setEditDialogVisible(false)} />
          </div>
        </div>

      </Dialog>
    </div>
  );
}
