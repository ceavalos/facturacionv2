
import { IFacturaDet } from '../models/FacturaDet';
//import  styles from '@/app/styles/FacturaDetalle.module.css';


import styles from '../styles/FacturaDetalle.module.css';

interface FacturaDetalleProps {
  productos: IFacturaDet[];
  onEdit?: (producto: IFacturaDet) => void;
  onDelete?: (id: string) => void;
}

export default function FacturaDetalle({ productos, onEdit, onDelete }: FacturaDetalleProps) {

  // Calcula los totales antes del return
  const subtotal = productos.reduce((sum, p) => sum + (p.total_gravado || 0), 0);
  const totalIva = productos.reduce((sum, p) => sum + (p.total_iva || 0), 0);
  const totalGeneral = subtotal + totalIva;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalle de Productos</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Categoría</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>IVA</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index} className={styles.row}>
              <td>{producto.cantidad}</td>
              <td>{producto.categoryDescription}</td>
              <td>{producto.productName}</td>
              <td>${producto.precio_unitario.toFixed(2)}</td>
              <td>${producto.total_iva.toFixed(2)}</td>
              <td>${producto.total_gravado.toFixed(2)}</td>
              <td className={styles.actions}>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit && onEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete && onDelete(producto._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td style={{ fontWeight: 'bold' }}>Subtotal</td>
            <td></td>
            <td style={{ fontWeight: 'bold' }}>${subtotal.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td style={{ fontWeight: 'bold' }}>Total IVA</td>
            <td></td>
            <td style={{ fontWeight: 'bold' }}>${totalIva.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
            <td style={{ fontWeight: 'bold' }}>Total General</td>
            <td></td>
            <td style={{ fontWeight: 'bold' }}>${totalGeneral.toFixed(2)}</td>
            <td></td>
          </tr>
        </tfoot>

      </table>
    </div>
  );
}

/*
import { IFacturaDet } from '../models/FacturaDet';

interface FacturaDetalleProps {
  productos: IFacturaDet[];
}

export default function FacturaDetalle({ productos }: FacturaDetalleProps) {
  return (
    <div>      
      <h1>FacturaDetalle</h1>
      {productos.map((producto, index) => (
        <div key={index}>
         <p>{producto.cantidad}</p>
         <p>{producto.categoryDescription}</p>
         <p>{producto.productName}</p>
         <p>{producto.precio_unitario}</p>
         <p>{producto.total_iva.toFixed(2)}</p>
         <p>{producto.total_gravado.toFixed(2)}</p>
         
        </div>
      ))}
    </div>
  );
}
*/