'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/navigation';

type CategoryProps = {
  _id: string;
  code: string;
  description: string;
  company: string;
  active: boolean;
  createdAt: Date;
}

const categoryEmpty: CategoryProps = {
  _id: '',
  code: '',
  description: '',
  company: '',
  active: true,
  createdAt: new Date()
}

export default function CategoryForm() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>(categoryEmpty);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [title, setTitle] = useState('Mantenimiento de Categorías');
  const [error, setError] = useState('');
  const router = useRouter();

  // Abrir modal para crear o editar
  const openDialog = (categoryToEdit: CategoryProps | null = null) => {
    if (categoryToEdit) {
      setSelectedCategory(categoryToEdit);
      setHeaderTitle("Edición de Categoría");
      setIsEditMode(true);
    } else {
      const company = localStorage.getItem('company') || '';
      setSelectedCategory({ ...categoryEmpty, company });
      setHeaderTitle("Creación de Categoría");
      setIsEditMode(false);
    }
    setError('');
    setEditDialogVisible(true);
  };

  // Guardar los cambios
  const saveChanges = async () => {
    const token = localStorage.getItem('token');
    setError('');
    
    if (!token) {
      console.error('No token found');
      setError('No token found');
      router.push("/login");
      return;
    }

    try {
      const url = `/dashboard/categories/api`;
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedCategory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditMode ? 'update' : 'create'} category`);
      }

      const updatedCategory = await response.json();

      setCategories((prevCategories) => {
        if (isEditMode) {
          return prevCategories.map((cat) =>
            cat._id === selectedCategory._id ? updatedCategory.category : cat
          );
        } else {
          return [...prevCategories, updatedCategory.category];
        }
      });

      setEditDialogVisible(false);
    } catch (error) {
      setError('Error saving category: ' + error);
      console.error('Error saving category:', error);
    }
  };

  // Renderizar el botón de editar
  const actionBodyTemplate = (rowData: CategoryProps) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        onClick={() => openDialog(rowData)}
      />
    );
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');

    if (!token || !company) {
      console.error('No token or company found');
      setError('No token or company found');
      router.push("/login");
      return;
    }

    try {
      const response = await fetch('/dashboard/categories/api', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'company': company
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories: ' + error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className={styles.title}>{title}</div>
      <Button
        label="Agregar Categoría"
        icon="pi pi-plus"
        onClick={() => openDialog(null)}
        className={styles.btn_new}
      />

      <div>
        <DataTable value={categories} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="code" header="Código" style={{ width: '35%' }}></Column>
          <Column field="description" header="Descripción" style={{ width: '40%' }}></Column>
          <Column header="Editar" body={actionBodyTemplate} style={{ width: '25%' }}></Column>
        </DataTable>

        {/* Ventana Modal */}
        <Dialog
          visible={editDialogVisible}
          style={{ width: '50vw' }}
          header={headerTitle}
          modal
          onHide={() => setEditDialogVisible(false)}
        >
          <div className={styles.company_form}>
            <div className={styles.form_group}>
              <label htmlFor="code">Código</label>
              <InputText
                id="code"
                className={styles.form_input}
                value={selectedCategory.code}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, code: e.target.value })}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="description">Descripción</label>
              <InputText
                id="description"
                className={styles.form_input}
                value={selectedCategory.description}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
              />
            </div>

            <div>
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <div className={styles.btn_save_cancel}>
              <Button
                label="Guardar"
                icon="pi pi-check"
                className="p-button-success"
                onClick={saveChanges}
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
    </div>
  );
}
