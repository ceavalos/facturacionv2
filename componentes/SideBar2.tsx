'use client'

import Image from 'next/image';
import styles from '../styles/sideBarStyles.module.css';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { Button } from 'primereact/button';
import Logout from '@/componentes/Logout';

export default function Sidebar2() {
  const [visibleLeft, setVisibleLeft] = useState(true);

  return (
    <>
      <Button
        label="Show Sidebar"
        icon="pi pi-bars"
        onClick={() => setVisibleLeft(true)}
        className="p-button-primary"
      />

      <Sidebar visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)}>
        <div className={styles.logo_container}>
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={150}
            height={50}
            priority
          />
        </div>
        <Logout />
        <h2>Menu</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <a href="/dashboard/users" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Mantenimiento de Usuarios
            </a>
          </li>
          <li>
            <a href="/dashboard/companies" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Mantenimiento Compañías
            </a>
          </li>
          <li>
            <a href="/dashboard/economicactivities" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Catalogo Actividades Economicas
            </a>
          </li>
          <li>
            <a href="/dashboard/categories" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Categorias productos
            </a>
          </li>
          <li>
            <a href="/dashboard/products" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Productos
            </a>
          </li>
          <li>
            <a href="/dashboard/clients" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Clientes
            </a>
          </li>
          <li>
            <a href="/dashboard/facturas" style={{ textDecoration: 'none', color: '#007ad9' }}>
              Facturas
            </a>
          </li>
        </ul>
      </Sidebar>
    </>
  )
}
