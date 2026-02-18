import { cartService } from '../services/CartService.js';
import { CartUtils } from '../utils/cartUtils.js';
import { Currency } from '../utils/currency.js';

export class CartModal {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.isOpen = false;
        
        this.init();
        this.bindEvents();
        this.subscribeToCart();
    }

    /**
     * Inicializar modal
     */
    init() {
        this.createModal();
    }

    /**
     * Crear estructura del modal en el DOM
     */
    createModal() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'cart-modal-overlay';
        this.overlay.style.display = 'none';

        // Crear modal
        this.modal = document.createElement('div');
        this.modal.className = 'cart-modal';
        this.modal.innerHTML = `
            <div class="cart-modal-header">
                <h2 class="cart-modal-title">Carrito de Compras</h2>
                <button class="cart-modal-close" aria-label="Cerrar carrito">×</button>
            </div>
            <div class="cart-modal-body">
                <div class="cart-items-container">
                    <!-- Items se cargan dinámicamente -->
                </div>
            </div>
            <div class="cart-modal-footer">
                <div class="cart-summary">
                    <div class="cart-summary-row">
                        <span class="cart-summary-label">Subtotal:</span>
                        <span class="cart-summary-value" id="cartSubtotal">$U 0</span>
                    </div>
                    <div class="cart-summary-row cart-summary-total">
                        <span class="cart-summary-label">Total:</span>
                        <span class="cart-summary-value" id="cartTotal">$U 0</span>
                    </div>
                </div>
                <div class="cart-actions">
                    <button class="btn btn-secondary btn-continue-shopping">Seguir Comprando</button>
                    <button class="btn btn-primary btn-checkout">Finalizar Compra</button>
                </div>
            </div>
        `;

        // Agregar al overlay
        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
    }

    /**
     * Vincular eventos
     */
    bindEvents() {
        // Cerrar con botón X
        const closeBtn = this.modal.querySelector('.cart-modal-close');
        closeBtn.addEventListener('click', () => this.close());

        // Cerrar con click en overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Botón seguir comprando
        const continueBtn = this.modal.querySelector('.btn-continue-shopping');
        continueBtn.addEventListener('click', () => this.close());

        // Botón finalizar compra
        const checkoutBtn = this.modal.querySelector('.btn-checkout');
        checkoutBtn.addEventListener('click', () => this.handleCheckout());

        // Delegación de eventos para items (aumentar, disminuir, eliminar)
        const itemsContainer = this.modal.querySelector('.cart-items-container');
        itemsContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;

            const action = button.dataset.action;
            const cartItem = button.closest('.cart-item');
            const productId = cartItem.dataset.productId;

            this.handleItemAction(action, productId);
        });
    }

    /**
     * Suscribirse a cambios del carrito
     */
    subscribeToCart() {
        cartService.subscribe((cartState) => {
            if (this.isOpen) {
                this.render();
            }
        });
    }

    /**
     * Abrir modal
     */
    open() {
        this.isOpen = true;
        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        this.render();
        
        // Animación de entrada
        setTimeout(() => {
            this.overlay.classList.add('show');
        }, 10);
    }

    /**
     * Cerrar modal
     */
    close() {
        this.overlay.classList.remove('show');
        
        setTimeout(() => {
            this.isOpen = false;
            this.overlay.style.display = 'none';
            document.body.style.overflow = ''; // Restaurar scroll
        }, 300);
    }

    /**
     * Renderizar contenido del modal
     */
    render() {
        const container = this.modal.querySelector('.cart-items-container');
        const items = cartService.getItems();

        if (items.length === 0) {
            container.innerHTML = CartUtils.renderEmptyCart();
            this.updateSummary(0, 0);
            return;
        }

        // Renderizar items
        container.innerHTML = items.map(item => CartUtils.renderCartItem(item)).join('');

        // Actualizar totales
        const subtotal = cartService.getSubtotal();
        const total = cartService.getTotal();
        this.updateSummary(subtotal, total);
    }

    /**
     * Actualizar resumen de totales
     */
    updateSummary(subtotal, total) {
        const subtotalEl = document.getElementById('cartSubtotal');
        const totalEl = document.getElementById('cartTotal');

        if (subtotalEl) subtotalEl.textContent = Currency.format(subtotal);
        if (totalEl) totalEl.textContent = Currency.format(total);
    }

    /**
     * Manejar acciones de items (aumentar, disminuir, eliminar)
     */
    handleItemAction(action, productId) {
        const item = cartService.getItem(productId);
        if (!item) return;

        switch(action) {
            case 'increase':
                cartService.updateQuantity(productId, item.cantidad + 1);
                break;
            case 'decrease':
                cartService.updateQuantity(productId, item.cantidad - 1);
                break;
            case 'remove':
                if (confirm(`¿Eliminar ${item.nombre} del carrito?`)) {
                    cartService.removeItem(productId);
                    CartUtils.showNotification('Producto eliminado del carrito', 'info');
                }
                break;
        }
    }

    /**
     * Manejar checkout
     */
    handleCheckout() {
        if (cartService.isEmpty()) {
            CartUtils.showNotification('El carrito está vacío', 'warning');
            return;
        }

        // TODO: Implementar página de checkout
        console.log('Redirigiendo a checkout...');
        CartUtils.showNotification('Función de checkout en desarrollo', 'info');
        
        // Futuro: window.location.href = 'checkout.html';
    }

    /**
     * Alternar visibilidad (abrir/cerrar)
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
}

// Instancia singleton
export const cartModal = new CartModal();