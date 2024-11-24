'use client'

import Logo from '../ui/Logo'
import styles from '../styles/sideBarStyles.module.css';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { Button } from 'primereact/button';

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
        <Logo />
      
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
        </ul>

      </Sidebar>


    </>



  )
}
