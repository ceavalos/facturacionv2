'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import jwt from 'jsonwebtoken';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/login/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        throw new Error(data.message || 'Error en la autenticación');
      }

      // Verificar que data.company existe antes de guardarlo
      if (!data.company) {
        console.error('No se recibió el ID de la compañía');
        setError('Error: No se recibió la información de la compañía');
        return;
      }
      console.log(data.company.toString())
      // Guardar datos en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('company', data.company.toString()); // Asegurarse de que sea string
      
      // Log para verificar que se guardó correctamente
      console.log('Datos guardados:', {
        token: data.token,
        company: data.company,
        stored_company: localStorage.getItem('company')
      });

      // Redirige al usuario al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
      console.error('Error en login:', err);
    }
  };

  useEffect(() => {
    // Verifica si el usuario tiene un token almacenado en localStorage
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');
    
    if (token && company) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.header}>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginButton}>Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
