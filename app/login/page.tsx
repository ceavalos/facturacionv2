'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css'  // Importa el archivo de estilos CSS
import jwt from 'jsonwebtoken';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const secreto = process.env.JWT_SECRET || 'someSecretKey123456789';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Resetea el error

    try {
      // Llama a la API de login      
      const res = await fetch('/login/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        setError(data.message );
        throw new Error(data.message || 'Error en la autenticación');
      }
      console.log(data)

      // Guarda el token JWT en localStorage
      localStorage.setItem('token', data.token);

      // Redirige al usuario al dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchProtectedData = async () => {
      // Recuperar el token almacenado en localStorage
      const token = localStorage.getItem('auth-token');

      if (token) {
        try {
          // Hacer la solicitud a la API protegida
          const res = await fetch('/api/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Incluir el token en el header
            },
          });
  
          if (res.ok) {
            const data = await res.json();
             // Redirige al usuario al dashboard
             router.push('/dashboard');
          }
  
          
        } catch (err: any) {
          setError(err.message);
        }
        

        
      }

     
    };

  }, []);



  return (
    <div className={styles.loginContainer}>
        <h1 className={styles.header}>Iniciar sesion</h1>
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
