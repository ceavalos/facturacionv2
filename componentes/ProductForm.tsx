'use client';

import React, { useEffect, useState } from 'react';
import styles from '../styles/Modal.module.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/navigation';

type CategoryType = {
  _id: string;
  description: string;
}

type ProductProps = {
  _id: string;
  name: string;
  category: CategoryType | string; 
  company: string;
  active: boolean;
  createdAt: Date;
}

const productEmpty: ProductProps = {
  _id: '',
  name: '',
  category: '',
  company: '',
  active: true,
  createdAt: new Date()
}

export default function ProductForm() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(productEmpty);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [title, setTitle] = useState('Mantenimiento de Productos');
  const [error, setError] = useState('');
  const router = useRouter();

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
          'Content-Type': `application/json`,
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
    }
  };

  const openDialog = (productToEdit: ProductProps | null = null) => {
    const company = localStorage.getItem('company') || '';
    if (productToEdit) {
      const categoryId = typeof productToEdit.category === 'object' 
        ? productToEdit.category._id 
        : productToEdit.category;
        
      setSelectedProduct({
        ...productToEdit,
        category: categoryId
      });
      setHeaderTitle("Edición de Producto");
      setIsEditMode(true);
    } else {
      setSelectedProduct({ ...productEmpty, company });
      setHeaderTitle("Creación de Producto");
      setIsEditMode(false);
    }
    setError('');
    setEditDialogVisible(true);
  };

  const saveChanges = async () => {
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
      const url = `/dashboard/products/api`;
      const method = isEditMode ? 'PUT' : 'POST';

      const { _id, ...productData } = selectedProduct;
      const productToSave = isEditMode 
        ? { ...selectedProduct, company }
        : { ...productData, company };

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `application/json`,
          'company': company
        },
        body: JSON.stringify(productToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${isEditMode ? 'update' : 'create'} product`);
      }

      const updatedProduct = await response.json();

      setProducts((prevProducts) => {
        if (isEditMode) {
          return prevProducts.map((prod) =>
            prod._id === selectedProduct._id ? updatedProduct.product : prod
          );
        } else {
          return [...prevProducts, updatedProduct.product];
        }
      });

      setEditDialogVisible(false);
    } catch (error) {
      setError('Error saving product: ' + error);
      console.error('Error saving product:', error);
    }
  };

  const actionBodyTemplate = (rowData: ProductProps) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        onClick={() => openDialog(rowData)}
      />
    );
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');

    if (!token || !company) {
      console.error('No token or company found');
      setError('No token or company found');
      router.push("/login");
      return;
    }

    try {
      const response = await fetch('/dashboard/products/api', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': `application/json`,
          'company': company
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products: ' + error);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className={styles.title}>{title}</div>
      <Button
        label="Agregar Producto"
        icon="pi pi-plus"
        onClick={() => openDialog(null)}
        className={styles.btn_new}
      />

      <div>
        <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" header="Nombre" style={{ width: '35%' }}></Column>
          <Column field="category.description" header="Categoría" style={{ width: '40%' }}></Column>
          <Column header="Editar" body={actionBodyTemplate} style={{ width: '25%' }}></Column>
        </DataTable>

        <Dialog
          visible={editDialogVisible}
          style={{ width: '50vw' }}
          header={headerTitle}
          modal
          onHide={() => setEditDialogVisible(false)}
        >
          <div className={styles.company_form}>
            <div className={styles.form_group}>
              <label htmlFor="name">Nombre</label>
              <InputText
                id="name"
                className={styles.form_input}
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="category">Categoría</label>
              <Dropdown
                id="category"
                value={selectedProduct.category}
                options={categories}
                onChange={(e) => setSelectedProduct({ 
                  ...selectedProduct, 
                  category: e.value 
                })}
                optionLabel="description"
                optionValue="_id"
                placeholder="Seleccione una categoría"
                className={styles.form_input}
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
