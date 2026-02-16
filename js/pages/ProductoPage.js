import { productService } from '../services/ProductService.js';
import { ProductCard } from '../components/ProductCard.js';
import { URLParams } from '../utils/urlParams.js';
import { Currency } from '../utils/currency.js';

class ProductoPage {
    constructor() {
        this.producto = null;
        this.currentImageIndex = 0;
    }

    /**
     * Inicializar página
     */
    async init() {
        try {
            // 1. Obtener ID de la URL
            const productId = URLParams.get('id');
            
            if (!productId) {
                this.showError('No se especificó un producto');
                return;
            }

            // 2. Cargar producto
            this.producto = productService.getById(productId);

            if (!this.producto) {
                this.showError('Producto no encontrado');
                return;
            }
            
            // 3. Renderizar todo
            this.render();
            
            // 4. Inicializar interactividad
            this.initGallery();
            this.initTabs();
            this.initQuantity();
            this.initActions();

        } catch (error) {
            console.error('Error al cargar producto:', error);
            this.showError('Producto no encontrado');
        }
    }

    /**
     * Renderizar toda la página
     */
    render() {
        this.renderBreadcrumb();
        this.renderGallery();
        this.renderProductInfo();
        this.renderNotes();
        this.renderSpecs();
        this.renderDescripcion();
        this.renderRelatedProducts();
    }

    /**
     * Renderizar breadcrumb
     */
    renderBreadcrumb() {
        const container = document.querySelector('.breadcrumb-list');
        if (!container) return;

        const category = this.producto.genero === 'hombre' ? 'Para Él' : 'Para Ella';
        const categoryParam = this.producto.genero;

        container.innerHTML = `
            <li class="breadcrumb-item">
                <a href="index.html" class="breadcrumb-link">Inicio</a>
            </li>
            <li class="breadcrumb-item">
                <a href="catalogo.html" class="breadcrumb-link">Catálogo</a>
            </li>
            <li class="breadcrumb-item">
                <a href="catalogo.html?category=${categoryParam}" class="breadcrumb-link">${category}</a>
            </li>
            <li class="breadcrumb-item breadcrumb-active" aria-current="page">
                ${this.producto.nombre}
            </li>
        `;
    }

    /**
     * Renderizar galería de imágenes
     */
    renderGallery() {
        // Imagen principal
        const mainImage = document.querySelector('.gallery-main-image');
        if (mainImage) {
            mainImage.src = this.producto.imagenes.principal;
            mainImage.alt = this.producto.nombre;
        }

        // Badges
        const badgeContainer = document.querySelector('.gallery-main .product-badge');
        if (badgeContainer && this.producto.badges?.length > 0) {
            const badgeText = this.getBadgeText(this.producto.badges[0]);
            const badgeClass = `product-badge-${this.producto.badges[0]}`;
            badgeContainer.className = `product-badge ${badgeClass}`;
            badgeContainer.textContent = badgeText;
        } else if (badgeContainer) {
            badgeContainer.style.display = 'none';
        }

        // Thumbnails
        const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = this.producto.imagenes.galeria.map((img, index) => `
                <button class="thumbnail-item ${index === 0 ? 'thumbnail-active' : ''}" 
                        data-image="${img}"
                        data-index="${index}">
                    <img src="${img}" 
                        alt="${this.producto.nombre} - Vista ${index + 1}" 
                        class="thumbnail-image">
                </button>
            `).join('');
        }
    }

    /**
     * Renderizar información del producto
     */
    renderProductInfo() {
        // Categoría
        const categoryLabel = document.querySelector('.product-category-label');
        if (categoryLabel) {
            categoryLabel.textContent = this.producto.genero === 'hombre' ? 'Para Él' : 'Para Ella';
        }

        // Título
        const title = document.querySelector('.product-title');
        if (title) {
            title.textContent = this.producto.nombre;
        }

        // Marca
        const brandName = document.querySelector('.brand-name');
        if (brandName) {
            brandName.textContent = this.producto.marca;
            brandName.href = `catalogo.html?brand=${encodeURIComponent(this.producto.marca)}`;
        }

        // Precio
        const priceMain = document.querySelector('.product-price-main');
        if (priceMain) {
            priceMain.textContent = Currency.format(this.producto.precio);
        }

        // Descripción corta
        const descriptionShort = document.querySelector('.product-description-short p');
        if (descriptionShort) {
            descriptionShort.textContent = this.producto.descripcionCorta;
        }
    }

    /**
     * Renderizar notas olfativas
     */
    renderNotes() {
        const notesGrid = document.querySelector('.notes-grid');
        if (!notesGrid) return;

        const notes = [
            { label: 'Salida', content: this.producto.notas.salida.join(', ') },
            { label: 'Corazón', content: this.producto.notas.corazon.join(', ') },
            { label: 'Fondo', content: this.producto.notas.fondo.join(', ') }
        ];

        notesGrid.innerHTML = notes.map(note => `
            <div class="note-item">
                <h4 class="note-label">${note.label}</h4>
                <p class="note-content">${note.content}</p>
            </div>
        `).join('');
    }

    /**
     * Renderizar especificaciones
     */
    renderSpecs() {
        const specsList = document.querySelector('.specs-list');
        if (!specsList) return;

        const specs = [
            { label: 'Concentración', value: `${this.producto.tipo} (${this.getConcentracionCompleta(this.producto.tipo)})` },
            { label: 'Tamaño', value: this.producto.tamaño },
            { label: 'Género', value: this.producto.genero === 'hombre' ? 'Masculino' : 'Femenino' },
            { label: 'Familia Olfativa', value: this.producto.familiaOlfativa },
            { label: 'Ocasión', value: this.producto.ocasion }
        ];

        specsList.innerHTML = specs.map(spec => `
            <li class="spec-item">
                <span class="spec-label">${spec.label}:</span>
                <span class="spec-value">${spec.value}</span>
            </li>
        `).join('');
    }


    /**
 * Renderizar descripción larga en el tab
 */
renderDescripcion() {
    const descripcionEl = document.querySelector('#tab-descripcion .tab-text');
    if (descripcionEl) {
        descripcionEl.textContent = this.producto.descripcionLarga;
    }
    
    const tabTitle = document.querySelector('#tab-descripcion .tab-title');
    if (tabTitle) {
        tabTitle.textContent = `Sobre ${this.producto.nombre}`;
    }
}

    /**
     * Renderizar productos relacionados
     */
    renderRelatedProducts() {
        const container = document.querySelector('.products-grid-related');
        if (!container) return;

        const related = productService.getRelated(this.producto.id, 4);
        container.innerHTML = ProductCard.renderMultiple(related);
    }

    /**
     * Inicializar galería interactiva
     */
    initGallery() {
        const mainImage = document.querySelector('.gallery-main-image');
        const thumbnails = document.querySelectorAll('.thumbnail-item');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Cambiar imagen principal
                const newImage = thumb.dataset.image;
                mainImage.src = newImage;

                // Actualizar clase activa
                thumbnails.forEach(t => t.classList.remove('thumbnail-active'));
                thumb.classList.add('thumbnail-active');

                // Actualizar índice
                this.currentImageIndex = parseInt(thumb.dataset.index);
            });
        });
    }

    /**
     * Inicializar tabs
     */
    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;

                // Actualizar botones
                tabButtons.forEach(btn => btn.classList.remove('tab-active'));
                button.classList.add('tab-active');

                // Actualizar paneles
                tabPanels.forEach(panel => {
                    panel.classList.remove('tab-panel-active');
                    if (panel.id === `tab-${targetTab}`) {
                        panel.classList.add('tab-panel-active');
                    }
                });
            });
        });
    }

    /**
     * Inicializar selector de cantidad
     */
    initQuantity() {
        const decreaseBtn = document.querySelector('.quantity-decrease');
        const increaseBtn = document.querySelector('.quantity-increase');
        const input = document.querySelector('.quantity-input');

        if (!decreaseBtn || !increaseBtn || !input) return;

        decreaseBtn.addEventListener('click', () => {
            const current = parseInt(input.value);
            if (current > 1) {
                input.value = current - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            const current = parseInt(input.value);
            const max = parseInt(input.max);
            if (current < max && current < this.producto.stock) {
                input.value = current + 1;
            }
        });

        // Validar input manual
        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (isNaN(value) || value < 1) value = 1;
            if (value > this.producto.stock) value = this.producto.stock;
            input.value = value;
        });
    }

    /**
     * Inicializar botones de acción
     */
    initActions() {
        const addToCartBtn = document.getElementById('addToCartBtn');
        const buyNowBtn = document.getElementById('buyNowBtn');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart();
            });
        }

        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                this.buyNow();
            });
        }
    }

    /**
     * Agregar al carrito
     */
    addToCart() {
        const cantidad = parseInt(document.querySelector('.quantity-input').value);
        
        // TODO: Implementar CartService
        console.log('Agregando al carrito:', {
            producto: this.producto,
            cantidad
        });

        // Feedback visual (temporal)
        alert(`${this.producto.nombre} agregado al carrito (${cantidad} unidad${cantidad > 1 ? 'es' : ''})`);
    }

    /**
     * Comprar ahora
     */
    buyNow() {
        const cantidad = parseInt(document.querySelector('.quantity-input').value);
        
        console.log('Comprando ahora:', {
            producto: this.producto,
            cantidad
        });

        // Redirigir a carrito (futuro)
        // window.location.href = 'carrito.html';
        alert('Redirigiendo a checkout...');
    }

    /**
     * Mostrar error
     */
    showError(message) {
        const container = document.querySelector('.container');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 0;">
                    <h2 style="color: var(--color-text-primary); margin-bottom: 1rem;">
                        ${message}
                    </h2>
                    <a href="catalogo.html" class="btn btn-primary">
                        Volver al Catálogo
                    </a>
                </div>
            `;
        }
    }

    /**
     * Utilidades
     */
    getBadgeText(badge) {
        const texts = {
            'nuevo': 'Nuevo',
            'popular': 'Popular',
            'exclusivo': 'Exclusivo'
        };
        return texts[badge] || badge;
    }

    getConcentracionCompleta(tipo) {
        const tipos = {
            'EDT': 'Eau de Toilette',
            'EDP': 'Eau de Parfum',
            'Parfum': 'Parfum',
            'EDC': 'Eau de Cologne'
        };
        return tipos[tipo] || tipo;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const page = new ProductoPage();
    page.init();
});