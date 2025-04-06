// FacturaHeader.tsx
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import styles from '../styles/Modal.module.css';

import { Client } from '@/app/types/interfaces';


interface FacturaHeaderProps {
    error: string | null;
    searchClient: any;
    filteredClientes: Client[];
    facturaEnc: {
        nombre: string;
        correoElectronico: string;
        tipoCliente: string;
        tipoFacturacion: string;
        dui: string;
        numeroRegistro: string;
    };
    filterClientes: (event: { query: string }) => void;
    handleClienteSeleccion: (event: { value: Client }) => void;
    handleClientChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    saveChanges: (event: React.MouseEvent) => void;
    setSearchClient: (value: any) => void;
    setModalVisible: (value: boolean) => void;
}

export default function FacturaHeader({
    error,
    searchClient,
    filteredClientes,
    facturaEnc,
    filterClientes,
    handleClienteSeleccion,
    handleClientChange,
    saveChanges,
    setSearchClient,
    setModalVisible
}: FacturaHeaderProps) {
    return (
        <div>
            {error && <div className={styles.error}>{error}</div>}

            <form>
                <h1 className={styles.title}>Creación de Factura</h1>

                <div className={styles.form_group}>
                    <label htmlFor="buscarCliente">Buscar Cliente</label>
                    <AutoComplete
                        id="buscarCliente"
                        value={searchClient}
                        suggestions={filteredClientes}
                        completeMethod={filterClientes}
                        field="nombre"
                        onChange={(e) => setSearchClient(e.value)}  // Cambiado de searchClient(e.value)
                        onSelect={handleClienteSeleccion}
                        className={styles.form_input}
                        placeholder="Buscar cliente..."
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className={styles.form_input}
                        value={facturaEnc.nombre || ''}
                        onChange={handleClientChange}
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="correoElectronico">Correo Electrónico</label>
                    <input
                        type="email"
                        id="correoElectronico"
                        name="correoElectronico"
                        className={styles.form_input}
                        value={facturaEnc.correoElectronico || ''}
                        onChange={handleClientChange}
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="tipoCliente">Tipo de Cliente</label>
                    <select
                        id="tipoCliente"
                        name="tipoCliente"
                        className={styles.form_input}
                        value={facturaEnc.tipoCliente || ''}
                        onChange={handleClientChange}
                    >
                        <option value="">Seleccione...</option>
                        <option value="NATURAL">Natural</option>
                        <option value="JURIDICA">Jurídica</option>
                    </select>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="tipoFacturacion">Tipo de Facturación</label>
                    <select
                        id="tipoFacturacion"
                        name="tipoFacturacion"
                        className={styles.form_input}
                        value={facturaEnc.tipoFacturacion || ''}
                        onChange={handleClientChange}
                    >
                        <option value="">Seleccione...</option>
                        <option value="CONSUMIDOR_FINAL">Consumidor Final</option>
                        <option value="CREDITO_FISCAL">Crédito Fiscal</option>
                    </select>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="dui">DUI</label>
                    <input
                        type="text"
                        id="dui"
                        name="dui"
                        className={styles.form_input}
                        value={facturaEnc.dui || ''}
                        onChange={handleClientChange}
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="numeroRegistro">Número de Registro</label>
                    <input
                        type="text"
                        id="numeroRegistro"
                        name="numeroRegistro"
                        className={styles.form_input}
                        value={facturaEnc.numeroRegistro || ''}
                        onChange={handleClientChange}
                    />
                </div>

                <div className={styles.headerButtons}
                    style={{ marginTop: '10px' }}>
                    <Button
                        label="Agregar Producto"
                        icon="pi pi-plus"
                        onClick={(e) => {
                            e.preventDefault(); // Prevenir el comportamiento por defecto
                            setModalVisible(true);
                        }}
                        className="p-button-success"
                    />

                    <Button
                        label="Guardar Factura"
                        icon="pi pi-save"
                        onClick={saveChanges}
                    // clastyle={{ marginTop: '10px' }}
                    />
                </div>
            </form>
        </div>
    );
}