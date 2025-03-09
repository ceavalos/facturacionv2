'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import styles from '../styles/Modal.module.css';

type UserInfo = {
  username: string;
  companyName: string;
}

export default function Logout() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: '', companyName: '' });

  useEffect(() => {
    // Verificar si existe el token en localStorage
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');
    setIsLoggedIn(!!token);

    if (token && company) {
      fetchUserInfo(token, company);
    }
  }, []);

  const fetchUserInfo = async (token: string, companyId: string) => {
    try {
      // Obtener la información de la compañía
      const response = await fetch(`/dashboard/companies/api?id=${companyId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching company info');
      }

      const companyData = await response.json();
      const username = localStorage.getItem('username') || '';
      
      setUserInfo({
        username: username,
        companyName: companyData.companyName || ''
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      // Si hay un error, al menos mostrar el nombre de usuario
      setUserInfo({
        username: localStorage.getItem('username') || '',
        companyName: 'No disponible'
      });
    }
  };

  const handleLogout = () => {
    // Eliminar el token y la información de la compañía del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    // Redirigir al usuario a la página de login
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };
  //&& userInfo.username
  return (
    <div className={styles.logout_container}>
      {isLoggedIn  && (
        <div className={styles.user_info}>
          <div className={styles.info_item}>
            <i className="pi pi-user" style={{ marginRight: '8px' }}></i>
            <span>user: {userInfo.username}</span>
          </div>
          <div className={styles.info_item}>
            <i className="pi pi-building" style={{ marginRight: '8px' }}></i>
            <span>company: {userInfo.companyName}</span>
          </div>
        </div>
      )}
      
      <div style={{ margin: '10px 0' }}>
        {isLoggedIn ? (
          <Button 
            icon="pi pi-sign-out" 
            label="Cerrar Sesión" 
            severity="danger" 
            onClick={handleLogout}
            style={{ width: '100%' }}
          />
        ) : (
          <Button 
            icon="pi pi-sign-in" 
            label="Iniciar Sesión" 
            severity="info" 
            onClick={handleLogin}
            style={{ width: '100%' }}
          />
        )}
      </div>
    </div>
  );
}
