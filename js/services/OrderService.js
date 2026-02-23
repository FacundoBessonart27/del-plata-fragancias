const ORDERS_STORAGE_KEY = 'delPlataOrders';

export class OrderService {
    constructor() {
        this.orders = this.loadOrders();
    }

    // Cargar órdenes desde localStorage
    // MIGRACIÓN FUTURA:
    // async loadOrders() {
    //     const response = await fetch('/api/orders', {
    //         headers: { 'Authorization': `Bearer ${token}` }
    //     });
    //     return await response.json();
    // }
    
    loadOrders() {
        try {
            const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading orders:', error);
            return [];
        }
    }

    // Guardar órdenes en localStorage

    saveOrders() {
        try {
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
        } catch (error) {
            console.error('Error saving orders:', error);
        }
    }

    //Crear nueva orden 
    //MIGRACIÓN FUTURA:
    // async createOrder(orderData) {
    //     const response = await fetch('/api/orders', {
    //        method: 'POST',
    //        headers: { 
    //            'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
     //        },
    //         body: JSON.stringify(orderData)
    //     });
    //     return await response.json();
    // }
    createOrder(orderData) {
        // Validar datos requeridos
        if (!orderData.items || orderData.items.length === 0) {
            throw new Error('No se pueden crear órdenes sin productos');
        }

        if (!orderData.customer || !orderData.customer.name || !orderData.customer.email) {
            throw new Error('Datos del cliente incompletos');
        }

        // Generar ID único (prefijo + timestamp)
        const orderId = 'DP-' + Date.now();

        // Crear objeto de orden completo
        const order = {
            id: orderId,
            items: orderData.items.map(item => ({
                id: item.id,
                nombre: item.nombre,
                marca: item.marca,
                precio: item.precio,
                cantidad: item.cantidad,
                imagen: item.imagen,
                subtotal: item.precio * item.cantidad
            })),
            total: orderData.total,
            customer: {
                name: orderData.customer.name.trim(),
                email: orderData.customer.email.trim().toLowerCase(),
                phone: orderData.customer.phone.trim()
            },
            date: new Date().toISOString(), 
            status: 'pending' 
        };

        // Guardar orden
        this.orders.unshift(order); 
        this.saveOrders();

        console.log('✅ Orden creada:', order);

        return order;
    }

    //  Obtener todas las órdenes
    
    // MIGRACIÓN FUTURA:
    // async getOrders() {
    //     const response = await fetch('/api/orders');
    //     return await response.json();
    // }

    getOrders() {
        return [...this.orders];
    }

    // Obtener orden por ID
    //MIGRACIÓN FUTURA:
    //async getOrderById(orderId) {
    //    const response = await fetch(`/api/orders/${orderId}`);
    //     return await response.json();
    // }
    getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId) || null;
    }

    // Obtener órdenes por email 
    getOrdersByEmail(email) {
        return this.orders.filter(order => 
            order.customer.email.toLowerCase() === email.toLowerCase()
        );
    }

    //Limpiar todas las órdenes 

    clearOrders() {
        this.orders = [];
        this.saveOrders();
        console.log('⚠️ Todas las órdenes han sido eliminadas');
    }

    //Obtener resumen de órdenes 

    getOrdersSummary() {
        const total = this.orders.reduce((sum, order) => sum + order.total, 0);
        const count = this.orders.length;
        const itemsCount = this.orders.reduce((sum, order) => 
            sum + order.items.reduce((itemSum, item) => itemSum + item.cantidad, 0), 0
        );

        return {
            totalOrders: count,
            totalRevenue: total,
            totalItems: itemsCount,
            averageOrderValue: count > 0 ? total / count : 0
        };
    }
}

// Instancia singleton
export const orderService = new OrderService();