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
            container.innerHTML = this.renderEmptyCart();
            this.updateSummary(0, 0);
            return;
        }

        // Renderizar items
        container.innerHTML = items.map(item => this.renderCartItem(item)).join('');

        // Actualizar totales
        const subtotal = cartService.getSubtotal();
        const total = cartService.getTotal();
        this.updateSummary(subtotal, total);
    }

    /**
     * Renderizar carrito vacío
     */
    renderEmptyCart() {
        const basePath = this.getBasePath();
        return `
            <div class="cart-empty">
                <p class="cart-empty-text">Tu carrito está vacío</p>
                <a href="${basePath}pages/catalogo.html" class="btn btn-primary">Ver Catálogo</a>
            </div>
        `;
    }

    /**
     * Renderizar item del carrito
     */
 renderCartItem(item) {
    console.log('📦 Renderizando item:', item);
    
    // Obtener imagen de forma SEGURA
    let imagePath = '';
    
    if (item.imagenes?.principal) {
        imagePath = item.imagenes.principal;
    } else if (item.imagen) {
        imagePath = item.imagen;
    } else {
        console.error('❌ Item sin imagen:', item);
        imagePath = 'assets/img/productos/default.jpg';
    }
    
    const finalImagePath = this.getImagePath(imagePath);
    const itemTotal = (item.precio || 0) * (item.cantidad || 1);
    
    console.log('🖼️ Imagen final:', finalImagePath); // DEBUG
    
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${finalImagePath}" 
                     alt="${item.nombre || 'Producto'}" 
                     onerror="console.error('Error imagen:', this.src); this.src='assets/img/productos/default.jpg'">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.nombre || 'Producto'}</h4>
                <p class="cart-item-brand">${item.marca || ''}</p>
                <p class="cart-item-price">${Currency.format(item.precio || 0)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-action="decrease">-</button>
                <span class="quantity-value">${item.cantidad || 1}</span>
                <button class="quantity-btn" data-action="increase">+</button>
            </div>
            <div class="cart-item-total">
                ${Currency.format(itemTotal)}
            </div>
            <button class="cart-item-remove" data-action="remove">
                <span class="remove-icon">×</span>
            </button>
        </div>
    `;
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
    async handleItemAction(action, productId) {
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
                // Importar dinámicamente solo cuando se necesita
                const { confirmModal } = await import('./ConfirmModal.js');
                const confirmed = await confirmModal.show(item.nombre);
                if (confirmed) {
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

        // Redirigir a checkout con ruta correcta
        const basePath = this.getBasePath();
        window.location.href = `${basePath}pages/checkout.html`;
    }

    /**
     * Obtener ruta base según ubicación actual
     */
    getBasePath() {
        const currentPath = window.location.pathname;
        
        // Si estamos en /pages/, necesitamos subir un nivel
        if (currentPath.includes('/pages/')) {
            return '../';
        }
        
        // Si estamos en la raíz, no necesitamos prefijo
        return '';
    }

    /**
     * Obtener ruta correcta de imagen según ubicación
     */
    getImagePath(imagePath) {
    const currentPath = window.location.pathname;
    const isInPages = currentPath.includes('/pages/');
    
    console.log('📂 Ruta actual:', currentPath, '| En pages:', isInPages, '| Imagen:', imagePath); // DEBUG
    
    return isInPages ? `../${imagePath}` : imagePath;
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