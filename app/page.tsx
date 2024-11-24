"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from 'primereact/button';
import BootstrapTest from "@/componentes/bootstrapTest";

export default function Home() {

  const handleClick = ()=>{{
    alert("Hello world!");
  }};

  return (
    <>
      <h1> desde principal, prueba de componentes primereact</h1>
      <BootstrapTest/>
    </>
  );
}
