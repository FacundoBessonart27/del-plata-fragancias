import { Currency } from './currency.js';

/**
 * Formatear información del carrito para mostrar
 */
export const CartUtils = {
    /**
     * Generar HTML de un item del carrito
     */
    renderCartItem(item) {
        return `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.nombre}</h4>
                    <p class="cart-item-brand">${item.marca}</p>
                    <p class="cart-item-price">${Currency.format(item.precio)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn quantity-decrease" data-action="decrease">-</button>
                    <span class="quantity-value">${item.cantidad}</span>
                    <button class="quantity-btn quantity-increase" data-action="increase">+</button>
                </div>
                <div class="cart-item-total">
                    ${Currency.format(item.precio * item.cantidad)}
                </div>
                <button class="cart-item-remove" data-action="remove" aria-label="Eliminar producto">
                    ×
                </button>
            </div>
        `;
    },

    /**
     * Generar mensaje de carrito vacío
     */
    renderEmptyCart() {
        return `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h3 class="cart-empty-title">Tu carrito está vacío</h3>
                <p class="cart-empty-text">Agrega productos para comenzar tu compra</p>
                <a href="catalogo.html" class="btn btn-primary">Ver Catálogo</a>
            </div>
        `;
    },

    /**
     * Animar icono del carrito
     */
    animateCartIcon() {
        const cartIcon = document.querySelector('.navbar-cart');
        if (!cartIcon) return;

        cartIcon.classList.add('cart-bounce');
        setTimeout(() => {
            cartIcon.classList.remove('cart-bounce');
        }, 600);
    },

    /**
     * Mostrar notificación temporal
     */
    showNotification(message, type = 'success') {
        // Remover notificación existente
        const existing = document.querySelector('.cart-notification');
        if (existing) {
            existing.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `cart-notification cart-notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Mostrar
        setTimeout(() => notification.classList.add('show'), 10);

        // Ocultar y eliminar
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};