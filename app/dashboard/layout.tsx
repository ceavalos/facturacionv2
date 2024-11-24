import Sidebar2 from "@/componentes/SideBar2";
import styles from '../../styles/layoutStyles.module.css';
import CompaniaList from "@/componentes/companySumary";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    
    return (
        <>
            <div className={`${styles.flex_md}`}>
                <Sidebar2/>

                <main className={`${styles.p_5} ${styles.flex_1} ${styles.h_screen} ${styles.overflow_y_scroll}`}>
                    {children}
                </main>
            </div>
        </>
    )
}