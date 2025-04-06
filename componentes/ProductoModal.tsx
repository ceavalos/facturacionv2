// componentes/ProductoModal.tsx
import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';

interface ProductoModalProps {
    visible: boolean;
    onHide: () => void;
    onSave: (producto: ProductoDetalle) => void;
    tipoFacturacion: string;
}

interface ProductoDetalle {
    category: string;
    Product: string;
    cantidad: number;
    precio_unitario: number;
    total_gravado: number;
    total_iva: number;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    Category: {
        _id: string;
        name?: string;
    };
}

export default function ProductoModal({ visible, onHide, onSave, tipoFacturacion }: ProductoModalProps) {
    const [searchProduct, setSearchProduct] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);
    const [precioUnitario, setPrecioUnitario] = useState<number>(0);

    // Función para buscar productos
    const searchProducts = async (event: { query: string }) => {
        try {
            // Agregamos console.log para debugging
            console.log('Buscando:', event.query);

            const token = localStorage.getItem('token');
            const company = localStorage.getItem('company');

            // Validar token y compañía
            if (!token || !company) {
                console.error('No token or company found');
                return;
            }

            // Validar que haya un término de búsqueda
            if (!event.query?.trim()) {
                setFilteredProducts([]);
                return;
            }

            /*const response = await fetch(`/api/dashboard/products/search?query=${encodeURIComponent(event.query)}`, {
                headers: {
                    'authorization': `Bearer ${token}`, // lowercase
                    'company': company // lowercase
                }
            });
            */
            const response = await fetch(`/api/dashboard/products/search?query=${encodeURIComponent(event.query)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Company': company
                }
            });            
            if (!response.ok) throw new Error('Error al buscar productos');
            const data = await response.json();
            console.log('Resultados:', data);
            setFilteredProducts(data);
            
        } catch (error) {
            console.error('Error:', error);
            setFilteredProducts([]);
        }
    };


    // Manejar la selección de un producto
    const handleProductSelect = (event: { value: Product }) => {
        console.log('Producto seleccionado:', event.value);
        setSelectedProduct(event.value);
        setPrecioUnitario(event.value.price);
    };

    const calcularTotales = () => {
        const subtotal = cantidad * precioUnitario;
        let totalGravado = 0;
        let totalIva = 0;

        if (tipoFacturacion === 'CONSUMIDOR_FINAL') {
            totalGravado = subtotal;
            totalIva = 0;
        } else {
            totalGravado = Math.round((subtotal / 1.13) * 100) / 100;
            totalIva = subtotal - totalGravado;
        }

        return { totalGravado, totalIva };
    };

    const handleSave = () => {
        if (!selectedProduct) return;

        const { totalGravado, totalIva } = calcularTotales();
        onSave({
            category: selectedProduct.Category._id,
            Product: selectedProduct._id,
            cantidad,
            precio_unitario: precioUnitario,
            total_gravado: totalGravado,
            total_iva: totalIva
        });

        // Limpiar el formulario
        setSelectedProduct(null);
        setSearchProduct('');
        setCantidad(1);
        setPrecioUnitario(0);
        onHide();
    };

    return (
        <Dialog
            header="Agregar Producto"
            visible={visible}
            onHide={onHide}
            style={{ width: '50vw' }}
            modal
        >
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="producto">Buscar Producto</label>
                    <AutoComplete
                        value={searchProduct}
                        suggestions={filteredProducts}
                        completeMethod={searchProducts}
                        field="name"  // Cambiado de 'nombre' a 'name'
                        onChange={(e) => setSearchProduct(e.value)}
                        onSelect={handleProductSelect}
                        placeholder="Buscar producto..."
                        delay={300}
                        minLength={1}
                        className="w-full"
                        dropdown
                        itemTemplate={(item) => (
                            <div>
                                {item.name} - {item.Category?.name || item.Category?._id || 'N/A'}
                            </div>
                        )}
                    />
                </div>

                {selectedProduct && (
                    <>
                        <div className="p-field">
                            <label>Categoría</label>
                            <InputText
                                value={selectedProduct.Category?.name || selectedProduct.Category?._id || 'N/A'}
                                disabled
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="cantidad">Cantidad</label>
                            <InputNumber
                                id="cantidad"
                                value={cantidad}
                                onValueChange={(e) => setCantidad(e.value || 0)}
                                min={1}
                            />
                        </div>

                        <div className="p-field">
                            <label htmlFor="precio">Precio Unitario</label>
                            <InputNumber
                                id="precio"
                                value={precioUnitario}
                                onValueChange={(e) => setPrecioUnitario(e.value || 0)}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                            />
                        </div>
                    </>
                )}

                <div className="p-field" style={{ marginTop: '1rem' }}>
                    <Button
                        label="Guardar"
                        onClick={handleSave}
                        className="p-button-success"
                        disabled={!selectedProduct || cantidad <= 0}
                    />
                </div>
            </div>
        </Dialog>
    );
}