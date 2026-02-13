/**
 * Capa de abstracción para acceso a productos
 * Facilita migración futura a API*
*/
import { PRODUCTOS } from '../data/productos.js';

export class ProductService {
    constructor() {
        this.productos = PRODUCTOS;
    }

    /**
     * Obtener producto por ID
     * En futuro: async getById(id) { return await fetch(`/api/productos/${id}`) }
     */
    getById(id) {
        const producto = this.productos.find(p => p.id === id);
        
        if (!producto) {
            throw new Error(`Producto con ID "${id}" no encontrado`);
        }

        return producto;
    }

    /**
     * Obtener productos relacionados
     * Mismo género, excluyendo el actual
     */
    getRelated(productoId, limit = 4) {
        const producto = this.getById(productoId);
        
        return this.productos
            .filter(p => 
                p.id !== productoId && 
                p.genero === producto.genero
            )
            .slice(0, limit);
    }

    /**
     * Obtener productos por género
     */
    getByGenero(genero) {
        return this.productos.filter(p => p.genero === genero);
    }

    /**
     * Verificar disponibilidad
     */
    checkStock(productoId, cantidad = 1) {
        const producto = this.getById(productoId);
        return producto.stock >= cantidad;
    }

    /**
     * Obtener todos los productos
     */
    getAll() {
        return [...this.productos];
    }

    /**
     * Buscar productos
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.productos.filter(p =>
            p.nombre.toLowerCase().includes(lowerQuery) ||
            p.marca.toLowerCase().includes(lowerQuery)
        );
    }
}

// Instancia singleton
export const productService = new ProductService();