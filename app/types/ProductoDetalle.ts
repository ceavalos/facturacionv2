
export interface ProductoDetalle {
    _id: string; 
    productId: string;
    categoryId: string;
    category: string;
    Product: string;
    cantidad: number;
    precio_unitario: number;
    total_gravado: number;
    total_iva: number;
    productName?: string; // Add this if you want to type the populated fields
    categoryDescription?: string; // Add this if you want to type the populated fields
}