// componentes/ProductoModal.tsx
import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';
import { ProductoDetalle as Product,ProductoDetalle } from '@/app/types/ProductoDetalle';
import { IFacturaDet } from '../models/FacturaDet';

interface ProductoModalProps {
    visible: boolean;
    onHide: () => void;
    onSave: (producto: ProductoDetalle) => void;
    tipoFacturacion: string;
    initialProducto?: ProductoDetalle; // Add this prop
    setCurrentProducto: (producto: ProductoDetalle) => void;
    productos: ProductoDetalle[];
    setDetalleProductos: (productos: ProductoDetalle[]) => void;
}

// interface Product {
//     category: {
//         description?: string;
//         _id: string;
//     };
//     _id: string;
//     name: string;
//     price: number;
// }

export default function ProductoModal(
    {   visible, 
        onHide,
        onSave, 
        tipoFacturacion, 
        initialProducto,
        setCurrentProducto,
        productos,
        setDetalleProductos,
         }: ProductoModalProps) {
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
            const response = await fetch(`/api/dashboard/products/search?query=${encodeURIComponent(event.query)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Company': company
                }
            });
            if (!response.ok) throw new Error('Error al buscar productos');
            const data = await response.json();
            console.log('Resultados:', data);
            console.log(response)
            setFilteredProducts(data);

        } catch (error) {
            console.error('Error:', error);
            setFilteredProducts([]);
        }
    };

    useEffect(() => {
        console.log('selectedProduct actualizado:', selectedProduct);
    }, [selectedProduct]);
    
     // Add this effect to handle initialProducto
     useEffect(() => {
        if (initialProducto && visible) {
            // Set form values based on the product to edit
            setCantidad(initialProducto.cantidad);
            setPrecioUnitario(initialProducto.precio_unitario);
            console.log('initialProducto:', initialProducto);
            setSelectedProduct(initialProducto);
            console.log('selectedProduct actualizado:', selectedProduct);
            setSearchProduct(initialProducto.productName);
            /* 
            // If you need to fetch the product details to get the full product object
            const fetchProductDetails = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const company = localStorage.getItem('company');
                    
                    const response = await fetch(`/dashboard/products/api/${initialProducto.productId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Company': company
                        }
                    });
                    
                    if (response.ok) {
                        const productData = await response.json();
                        setSelectedProduct(productData);
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            };
            
            fetchProductDetails();
            */
        } else if (!visible) {
            // Reset form when modal closes
            setCantidad(1);
            setPrecioUnitario(0);
            setSelectedProduct(null);
            setSearchProduct('');
            setFilteredProducts([]);
        }
    }, [initialProducto, visible]);

    // Manejar la selección de un producto
    const handleProductSelect = (event: { value: Product }) => {
        console.log('Producto seleccionado:', event.value);
        setSelectedProduct(event.value);
        setPrecioUnitario(event.value.price);
        setCantidad(1);
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
            //totalGravado=subtotal;
        }

        return { totalGravado, totalIva };
    };

    const handleSave = () => {
        if (!selectedProduct) {
            alert('Por favor seleccione un producto');
            return;
        }
    
        if (cantidad <= 0) {
            alert('La cantidad debe ser mayor a 0');
            return;
        }
    
        // Calculate values based on tipo de facturación
        const precioUnitarioFinal = precioUnitario;
        let totalGravado = 0;
        let totalIva = 0;
    
        if (tipoFacturacion === 'CONSUMIDOR_FINAL') {
            totalGravado = precioUnitarioFinal * cantidad;
            totalIva = 0;
        } else {
            // For other types, calculate with IVA
            totalGravado = (precioUnitarioFinal * cantidad) / 1.13;
            totalIva = totalGravado * 0.13;
        }
        console.log("initialProducto", initialProducto);

        const productoDetalle: ProductoDetalle = {
            // If editing (initialProducto exists), use its ID, otherwise generate a new one
            _id: initialProducto?._id || `temp-${Date.now()}`,
            category: selectedProduct.category._id,
            Product: selectedProduct._id,
            productName: selectedProduct.name||selectedProduct.productName,
            categoryId: selectedProduct.category._id,
            categoryDescription: selectedProduct.category.description||selectedProduct.categoryDescription,
            cantidad: cantidad, 
            precio_unitario: precioUnitarioFinal,
            total_gravado: totalGravado,
            total_iva: totalIva
        };

        // Create the product object
        if (initialProducto) {
            console.log("dentro del update",selectedProduct)
            const productosActualizados = productos.map(p =>
                p._id === selectedProduct._id ? productoDetalle : p
              );
            console.log("productosActualizados", productosActualizados);
            setDetalleProductos(productosActualizados);
        }
        else{
            console.log("dentro del create")           
            onSave(productoDetalle);
        }

      
        // Reset form fields
        setSelectedProduct(null);
        setCantidad(1);
        setPrecioUnitario(0);
        setSearchProduct('');
        setCurrentProducto(null);
        
        // Close the modal
        onHide();
    };

/*
    const handleSave = () => {
        if (!selectedProduct) return;

        const { totalGravado, totalIva } = calcularTotales();
        // console.log("selectedProduct", selectedProduct);
        // console.log("selectedProduct._id", selectedProduct._id);
        onSave({
            category: selectedProduct.category._id,
            Product: selectedProduct._id,
            cantidad,
            precio_unitario: precioUnitario,
            total_gravado: totalGravado,
            total_iva: totalIva,
            productName: selectedProduct.name,
            categoryDescription: selectedProduct.category.description
        });

        // Limpiar el formulario
        setSelectedProduct(null);
        setSearchProduct('');
        setCantidad(1);
        setPrecioUnitario(0);
        onHide();
    };
*/
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
                                {item.name} - {item.Category?.description || item.Category?._id || 'N/A'}
                            </div>
                        )}
                    />
                </div>

                {selectedProduct && (
                    <>
                        <div className="p-field">
                            <label>Categoría</label>
                            <InputText
                                 value={selectedProduct.category?.description || selectedProduct.categoryDescription|| 'N/A'}
                                //value={selectedProduct.categoryDescription|| 'N/A'}
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