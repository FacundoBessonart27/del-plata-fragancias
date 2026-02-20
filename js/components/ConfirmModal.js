//Alerta de Cancelación de Compra
export class ConfirmModal {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.resolvePromise = null;
        this.init();
    }

    init() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'confirm-modal-overlay';

        // Crear modal
        this.modal = document.createElement('div');
        this.modal.className = 'confirm-modal';
        this.modal.innerHTML = `
            <div class="confirm-modal-icon">⚠️</div>
            <h3 class="confirm-modal-title">Confirmar eliminación</h3>
            <div class="confirm-modal-product">
                <p class="confirm-modal-product-name" id="confirmProductName"></p>
            </div>
            <p class="confirm-modal-message">¿Estás seguro de que deseas eliminar este producto del carrito?</p>
            <div class="confirm-modal-actions">
                <button class="btn btn-confirm-cancel" id="confirmCancel">Cancelar</button>
                <button class="btn btn-confirm-delete" id="confirmDelete">Eliminar</button>
            </div>
        `;

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);

        // Eventos
        this.bindEvents();
    }

    bindEvents() {
        const cancelBtn = document.getElementById('confirmCancel');
        const deleteBtn = document.getElementById('confirmDelete');

        cancelBtn.addEventListener('click', () => this.close(false));
        deleteBtn.addEventListener('click', () => this.close(true));

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.close(false);
            }
        });

        // Click en overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close(false);
            }
        });
    }


    show(productName) {
        return new Promise((resolve) => {
            this.resolvePromise = resolve;

            // Actualizar nombre del producto
            const productNameEl = document.getElementById('confirmProductName');
            productNameEl.textContent = productName;

            // Mostrar modal
            this.overlay.style.display = 'flex';
            setTimeout(() => {
                this.overlay.classList.add('show');
            }, 10);
        });
    }

    close(confirmed) {
        this.overlay.classList.remove('show');

        setTimeout(() => {
            this.overlay.style.display = 'none';
            if (this.resolvePromise) {
                this.resolvePromise(confirmed);
                this.resolvePromise = null;
            }
        }, 300);
    }
}

// Instancia singleton
export const confirmModal = new ConfirmModal();