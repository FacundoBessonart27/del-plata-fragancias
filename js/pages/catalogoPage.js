/**
 * CATALOGO PAGE
 * Controller de la página del catálogo
 */

import { productService } from '../services/ProductService.js';
import { ProductCard } from '../components/ProductCard.js';
import { URLParams } from '../utils/urlParams.js';
class CatalogoPage {
    constructor() {
        this.productos = [];
        this.productosFiltrados = [];
    }

    async init() {
        try {
            console.log('🚀 Iniciando CatalogoPage...');
            
            // Cargar todos los productos
            this.productos = productService.getAll();
            this.productosFiltrados = [...this.productos];
            
            console.log('✅ Productos cargados:', this.productos.length);
            
            // Renderizar
            this.renderProducts();
            this.updateCount();
            
            // Inicializar filtros y ordenamiento
            this.initFilters();
            this.initSort();

            console.log('✅ Catálogo renderizado');

        } catch (error) {
            console.error('❌ Error al cargar catálogo:', error);
            this.showError('Error al cargar productos');
        }
    }

    renderProducts() {
        const container = document.querySelector('.products-grid-catalog');
        if (!container) {
            console.warn('⚠️ Container de productos no encontrado');
            return;
        }

        if (this.productosFiltrados.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-lg);">
                        No se encontraron productos con los filtros seleccionados.
                    </p>
                </div>
            `;
            return;
        }

        container.innerHTML = ProductCard.renderMultiple(this.productosFiltrados);
        console.log('✅ Productos renderizados:', this.productosFiltrados.length);
    }

    updateCount() {
        const countEl = document.querySelector('.catalog-results-count strong');
        if (countEl) {
            countEl.textContent = this.productosFiltrados.length;
        }
    }

    initFilters() {
        const form = document.getElementById('catalogFilters');
        if (!form) return;

        // Botón aplicar filtros
        const applyBtn = form.querySelector('.btn-filter-apply');
        if (applyBtn) {
            applyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.applyFilters();
            });
        }

        // Botón limpiar filtros
        const resetBtn = form.querySelector('.btn-filter-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                form.reset();
                this.productosFiltrados = [...this.productos];
                this.renderProducts();
                this.updateCount();
            });
        }
    }

    applyFilters() {
        console.log('🔍 Aplicando filtros...');
        
        let filtered = [...this.productos];

        // Filtro por categoría (género)
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
        if (categoryCheckboxes.length > 0) {
            const categories = Array.from(categoryCheckboxes).map(cb => cb.value);
            filtered = filtered.filter(p => categories.includes(p.genero));
        }

        // Filtro por tipo (EDT, EDP, etc)
        const typeCheckboxes = document.querySelectorAll('input[name="type"]:checked');
        if (typeCheckboxes.length > 0) {
            const types = Array.from(typeCheckboxes).map(cb => cb.value.toUpperCase());
            filtered = filtered.filter(p => types.includes(p.tipo));
        }

        // Filtro por marca
        const brandSelect = document.getElementById('brandFilter');
        if (brandSelect && brandSelect.value) {
            const selectedBrand = brandSelect.value.toLowerCase();
            filtered = filtered.filter(p => {
            const marcaNormalizada = p.marca
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Quita acentos
            .replace(/\s+/g, '-');
            return marcaNormalizada.includes(selectedBrand);
        });
        }

        // Filtro por precio
        const priceRadio = document.querySelector('input[name="price"]:checked');
        if (priceRadio) {
            const priceRange = priceRadio.value;
            filtered = this.filterByPrice(filtered, priceRange);
        }

        this.productosFiltrados = filtered;
        this.renderProducts();
        this.updateCount();
        
        console.log('✅ Filtros aplicados. Productos:', filtered.length);
    }

    filterByPrice(productos, range) {
        switch(range) {
        case '0-4000':
            return productos.filter(p => p.precio < 4000);
        case '4000-6000':
            return productos.filter(p => p.precio >= 4000 && p.precio <= 6000);
        case '6000-8000':
            return productos.filter(p => p.precio > 6000 && p.precio <= 8000);
        case '8000+':
            return productos.filter(p => p.precio > 8000);
        default:
            return productos;
    }
    }

    initSort() {
        const sortSelect = document.getElementById('sortBy');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            console.log('🔄 Ordenando por:', sortValue);
            
            this.productosFiltrados = productService.sort(this.productosFiltrados, sortValue);
            this.renderProducts();
        });
    }

    showError(message) {
        const container = document.querySelector('.catalog-products');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 0;">
                    <h2 style="color: var(--color-text-primary); margin-bottom: 1rem;">
                        ${message}
                    </h2>
                    <a href="index.html" class="btn btn-primary">
                        Volver al Inicio
                    </a>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const page = new CatalogoPage();
    page.init();
});