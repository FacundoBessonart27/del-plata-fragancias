/**
 * Clase estática responsable de generar el HTML de tarjetas de productos.
 * Funciona como componente reutilizable dentro del catálogo. 
*/
import { Currency } from '../utils/currency.js';

export class ProductCard {

    static render(producto) {
        const badgesHTML = this.renderBadges(producto.badges);
        const precioHTML = Currency.format(producto.precio);

        return `
            <article class="product-card">
                <a href="producto.html?id=${producto.id}" class="product-card-link">
                    <div class="product-image-container">
                        <img src="${producto.imagenes.principal}" 
                            alt="${producto.nombre}" 
                            class="product-image"
                            loading="lazy">
                        ${badgesHTML}
                    </div>
                    <div class="product-info">
                        <p class="product-category">${this.formatCategory(producto.genero)}</p>
                        <h3 class="product-name">${producto.nombre}</h3>
                        <p class="product-tagline">${producto.tagline}</p>
                        <div class="product-footer">
                            <span class="product-price">${precioHTML}</span>
                            <span class="product-cta">Ver detalle</span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }


    static renderBadges(badges) {
        if (!badges || badges.length === 0) return '';

        return badges.map(badge => {
            const badgeText = this.getBadgeText(badge);
            const badgeClass = `product-badge product-badge-${badge}`;
            return `<span class="${badgeClass}">${badgeText}</span>`;
        }).join('');
    }

    static getBadgeText(badge) {
        const badgeTexts = {
            'nuevo': 'Nuevo',
            'popular': 'Popular',
            'exclusivo': 'Exclusivo',
            'oferta': 'Oferta'
        };
        return badgeTexts[badge] || badge;
    }

    static formatCategory(genero) {
        return genero === 'hombre' ? 'Para Él' : 'Para Ella';
    }

    static renderMultiple(productos) {
        return productos.map(producto => this.render(producto)).join('');
    }
}