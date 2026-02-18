const CART_STORAGE_KEY = 'delPlataCart';

export class CartService {
    constructor() {
        this.items = this.loadCart();
        this.listeners = []; // Observadores para cambios
    }

    /**
     * Cargar carrito desde localStorage
     */
    loadCart() {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    /**
     * Guardar carrito en localStorage
     */
    saveCart() {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
            this.notifyListeners(); // Notificar a todos los observadores
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    /**
     * Agregar producto al carrito
     * Si ya existe, aumenta la cantidad
     */
    addItem(producto, cantidad = 1) {
        const existingItem = this.items.find(item => item.id === producto.id);

        if (existingItem) {
            // Ya existe: aumentar cantidad
            existingItem.cantidad += cantidad;
            
            // Validar stock
            if (producto.stock && existingItem.cantidad > producto.stock) {
                existingItem.cantidad = producto.stock;
            }
        } else {
            // No existe: agregar nuevo
            this.items.push({
                id: producto.id,
                nombre: producto.nombre,
                marca: producto.marca,
                precio: producto.precio,
                imagen: producto.imagenes.principal,
                cantidad: cantidad,
                stock: producto.stock
            });
        }

        this.saveCart();
        return existingItem ? 'updated' : 'added';
    }

    /**
     * Eliminar producto del carrito
     */
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    /**
     * Actualizar cantidad de un producto
     */
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            // Validar que la cantidad sea válida
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else if (item.stock && newQuantity > item.stock) {
                item.cantidad = item.stock;
                this.saveCart();
            } else {
                item.cantidad = newQuantity;
                this.saveCart();
            }
        }
    }

    /**
     * Obtener todos los items
     */
    getItems() {
        return [...this.items];
    }

    /**
     * Obtener cantidad total de productos
     */
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    /**
     * Calcular subtotal (sin descuentos)
     */
    getSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.precio * item.cantidad);
        }, 0);
    }

    /**
     * Calcular total (con posibles descuentos futuros)
     */
    getTotal() {
        // Por ahora, total = subtotal
        // Aquí se pueden agregar descuentos, impuestos, etc.
        return this.getSubtotal();
    }

    /**
     * Verificar si el carrito está vacío
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Limpiar carrito completamente
     */
    clear() {
        this.items = [];
        this.saveCart();
    }

    /**
     * Obtener un item específico
     */
    getItem(productId) {
        return this.items.find(item => item.id === productId);
    }

    /**
     * Verificar si un producto está en el carrito
     */
    hasItem(productId) {
        return this.items.some(item => item.id === productId);
    }

    /**
     * Suscribirse a cambios del carrito (Patrón Observer)
     */
    subscribe(callback) {
        this.listeners.push(callback);
        
        // Retornar función para desuscribirse
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    /**
     * Notificar a todos los listeners sobre cambios
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.getCartState());
            } catch (error) {
                console.error('Error in cart listener:', error);
            }
        });
    }

    /**
     * Obtener estado completo del carrito
     */
    getCartState() {
        return {
            items: this.getItems(),
            totalItems: this.getTotalItems(),
            subtotal: this.getSubtotal(),
            total: this.getTotal(),
            isEmpty: this.isEmpty()
        };
    }
}

// Instancia singleton
export const cartService = new CartService();