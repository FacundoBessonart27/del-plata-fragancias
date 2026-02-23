import { URLParams } from '../utils/urlParams.js';
import { orderService } from '../services/OrderService.js';

class SuccessPage {
    constructor() {
        this.orderId = null;
        this.order = null;
    }

    /**
     * Inicializar página de éxito
     */
    init() {
        console.log('✅ Inicializando página de éxito...');

        // PASO 1: Obtener ID de orden desde URL
        this.orderId = URLParams.get('order');

        // PASO 2: Validar que existe el parámetro
        if (!this.orderId) {
            console.warn('⚠️ No se encontró número de orden en la URL');
            alert('No se encontró información de la orden');
            window.location.href = 'index.html';
            return;
        }

        console.log('✅ Orden ID:', this.orderId);

        // PASO 3: Mostrar número de orden
        this.displayOrderNumber();

        // PASO 4: (Opcional) Cargar detalles de la orden
        this.loadOrderDetails();
    }

    /**
     * Mostrar número de orden
     */
    displayOrderNumber() {
        const orderNumberEl = document.getElementById('orderNumber');
        
        if (orderNumberEl) {
            orderNumberEl.textContent = this.orderId;
        }

        // Actualizar título de la página
        document.title = `Orden ${this.orderId} - Del Plata Fragancias`;
    }

    /**
     * Cargar detalles completos de la orden (opcional)
     * Útil para mostrar más información en el futuro
     */
    loadOrderDetails() {
        try {
            this.order = orderService.getOrderById(this.orderId);

            if (this.order) {
                console.log('✅ Detalles de la orden:', this.order);
                
            } else {
                console.warn('⚠️ Orden no encontrada en localStorage');
            }
        } catch (error) {
            console.error('❌ Error al cargar orden:', error);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const page = new SuccessPage();
    page.init();
});
