import Image from "next/image";
import styles from '../styles/logoStyles.module.css';

export default function Logo() {
  return (
    <div className={styles.container}>  
        <div className={`${styles.relative} ${styles.w40} ${styles.h40}`}>
            <Image
                fill
                alt="Logotipo Sistema Contable"
                src='/accounting-logo-small.svg'
                priority
            />
        </div>
    </div>
  )
}
