export class ConfirmAlert {
    constructor() {
        this.overlay = null;
        this.alert = null;
        this.init();
    }

    init() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'confirm-alert-overlay';

        // Crear alerta
        this.alert = document.createElement('div');
        this.alert.className = 'confirm-alert';
        this.alert.innerHTML = `
            <div class="confirm-alert-icon">✓</div>
            <h3 class="confirm-alert-title">¡Compra realizada con éxito!</h3>
            <p class="confirm-alert-message">Tu pedido ha sido procesado correctamente</p>
            <button class="btn btn-primary confirm-alert-button" id="confirmAlertBtn">
                Continuar
            </button>
        `;

        this.overlay.appendChild(this.alert);
        document.body.appendChild(this.overlay);

        // Eventos
        this.bindEvents();
    }

    bindEvents() {
        const button = document.getElementById('confirmAlertBtn');
        
        button.addEventListener('click', () => {
            this.close();
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.close();
            }
        });
    }

    /**
     * Mostrar alerta
     * @returns {Promise}
     */
    show() {
        return new Promise((resolve) => {
            this.overlay.style.display = 'flex';
            setTimeout(() => {
                this.overlay.classList.add('show');
            }, 10);

            // Resolver cuando se cierre
            const button = document.getElementById('confirmAlertBtn');
            button.addEventListener('click', () => {
                resolve();
            }, { once: true });
        });
    }

    close() {
        this.overlay.classList.remove('show');
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
        }, 300);
    }
}

// Instancia singleton
export const confirmAlert = new ConfirmAlert();