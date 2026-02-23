import { cartService } from '../services/CartService.js';
import { orderService } from '../services/OrderService.js';
import { Currency } from '../utils/currency.js';
import { Validator } from '../utils/validator.js';
import { confirmAlert } from '../components/ConfirmAlerts.js';

class CheckoutPage {
    constructor() {
        this.form = null;
        this.cartItems = [];
        this.total = 0;
    }

    /**
     * Inicializar página de checkout
     */
    async init() {
        console.log('🛒 Inicializando checkout...');

        // PASO 1: Verificar que el carrito NO esté vacío
        this.cartItems = cartService.getItems();
        
        if (this.cartItems.length === 0) {
            console.warn('⚠️ Carrito vacío, redirigiendo...');
            alert('Tu carrito está vacío. Agrega productos antes de continuar.');
            window.location.href = 'catalogo.html';
            return;
        }

        // PASO 2: Renderizar resumen del carrito
        this.renderCartSummary();

        // PASO 3: Inicializar formulario
        this.initForm();

        console.log('✅ Checkout listo');
    }

    /**
     * Renderizar resumen del carrito
     */
    renderCartSummary() {
        const itemsContainer = document.getElementById('checkoutItems');
        const subtotalEl = document.getElementById('checkoutSubtotal');
        const totalEl = document.getElementById('checkoutTotal');

        if (!itemsContainer) return;

        // Calcular totales
        this.total = cartService.getTotal();
        const subtotal = cartService.getSubtotal();

        // Renderizar items
        itemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
                </div>
                <div class="checkout-item-info">
                    <h4 class="checkout-item-name">${item.nombre}</h4>
                    <p class="checkout-item-details">
                        ${item.marca} × ${item.cantidad}
                    </p>
                    <p class="checkout-item-price">${Currency.format(item.precio * item.cantidad)}</p>
                </div>
            </div>
        `).join('');

        // Actualizar totales
        if (subtotalEl) subtotalEl.textContent = Currency.format(subtotal);
        if (totalEl) totalEl.textContent = Currency.format(this.total);

        console.log(`✅ Resumen renderizado: ${this.cartItems.length} productos, Total: ${Currency.format(this.total)}`);
    }

    /**
     * Inicializar formulario y validaciones
     */
    initForm() {
        this.form = document.getElementById('checkoutForm');
        if (!this.form) return;

        // Validación en tiempo real
        const nameInput = document.getElementById('customerName');
        const emailInput = document.getElementById('customerEmail');
        const phoneInput = document.getElementById('customerPhone');

        // Validar nombre al escribir
        nameInput?.addEventListener('blur', () => this.validateName());
        
        // Validar email al escribir
        emailInput?.addEventListener('blur', () => this.validateEmail());
        
        // Validar teléfono al escribir
        phoneInput?.addEventListener('blur', () => this.validatePhone());

        // Formatear teléfono mientras escribe
        phoneInput?.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, ''); // Solo números
            if (value.length <= 9) {
                e.target.value = value;
            }
        });

        // Submit del formulario
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        console.log('✅ Formulario inicializado');
    }

    /**
     * Validar nombre
     */
    validateName() {
        const input = document.getElementById('customerName');
        const error = document.getElementById('nameError');
        const value = input.value.trim();

        if (!Validator.isValidName(value)) {
            this.showError(input, error, 'El nombre debe tener al menos 3 caracteres');
            return false;
        }

        this.clearError(input, error);
        return true;
    }

    /**
     * Validar email
     */
    validateEmail() {
        const input = document.getElementById('customerEmail');
        const error = document.getElementById('emailError');
        const value = input.value.trim();

        if (!Validator.isValidEmail(value)) {
            this.showError(input, error, 'Ingresa un email válido');
            return false;
        }

        this.clearError(input, error);
        return true;
    }

    /**
     * Validar teléfono
     */
    validatePhone() {
        const input = document.getElementById('customerPhone');
        const error = document.getElementById('phoneError');
        const value = input.value.trim();

        if (!Validator.isValidPhone(value)) {
            this.showError(input, error, 'Ingresa un teléfono válido (Ej: 099123456)');
            return false;
        }

        this.clearError(input, error);
        return true;
    }

    /**
     * Mostrar error en campo
     */
    showError(input, errorEl, message) {
        input.classList.add('form-input-error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    /**
     * Limpiar error en campo
     */
    clearError(input, errorEl) {
        input.classList.remove('form-input-error');
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    /**
     * Manejar envío del formulario
     */
    async handleSubmit() {
        console.log('📝 Procesando formulario...');

        // PASO 1: Validar todos los campos
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();

        if (!isNameValid || !isEmailValid || !isPhoneValid) {
            console.warn('⚠️ Formulario con errores');
            alert('Por favor, completa correctamente todos los campos');
            return;
        }

        // PASO 2: Recopilar datos del formulario
        const formData = {
            name: document.getElementById('customerName').value.trim(),
            email: document.getElementById('customerEmail').value.trim().toLowerCase(),
            phone: Validator.cleanPhone(document.getElementById('customerPhone').value)
        };

        console.log('✅ Datos del formulario:', formData);

        // PASO 3: Verificar nuevamente que el carrito no esté vacío
        if (cartService.isEmpty()) {
            alert('Tu carrito está vacío');
            window.location.href = 'catalogo.html';
            return;
        }

        // PASO 4: Crear orden
        try {
            const order = orderService.createOrder({
                items: this.cartItems,
                total: this.total,
                customer: formData
            });

            console.log('✅ Orden creada:', order.id);

            // PASO 5: Limpiar carrito
            cartService.clear();
            console.log('✅ Carrito limpiado');

            // PASO 6: Mostrar confirmación
            await confirmAlert.show();

            // PASO 7: Redirigir a página de éxito
            window.location.href = `success.html?order=${order.id}`;

        } catch (error) {
            console.error('❌ Error al procesar orden:', error);
            alert('Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const page = new CheckoutPage();
    page.init();
});