export class ValidationAlert {
    constructor() {
        this.overlay = null;
        this.alert = null;
        this.init();
    }

    init() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'validation-alert-overlay';

        // Crear alerta
        this.alert = document.createElement('div');
        this.alert.className = 'validation-alert';
        this.alert.innerHTML = `
            <div class="validation-alert-icon">⚠️</div>
            <h3 class="validation-alert-title">Revisa los campos</h3>
            <p class="validation-alert-message" id="validationAlertMessage">
                Por favor, completa correctamente todos los campos
            </p>
            <button class="btn btn-primary validation-alert-button" id="validationAlertBtn">
                Entendido
            </button>
        `;

        this.overlay.appendChild(this.alert);
        document.body.appendChild(this.overlay);

        // Eventos
        this.bindEvents();
    }

    bindEvents() {
        const button = document.getElementById('validationAlertBtn');
        
        button.addEventListener('click', () => {
            this.close();
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.close();
            }
        });

        // Cerrar al hacer click en overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    /**
     * Mostrar alerta
     * @param {string} message - Mensaje personalizado (opcional)
     * @returns {Promise}
     */
    show(message = 'Por favor, completa correctamente todos los campos') {
        return new Promise((resolve) => {
            // Actualizar mensaje
            const messageEl = document.getElementById('validationAlertMessage');
            messageEl.textContent = message;

            // Mostrar
            this.overlay.style.display = 'flex';
            setTimeout(() => {
                this.overlay.classList.add('show');
            }, 10);

            // Resolver cuando se cierre
            const button = document.getElementById('validationAlertBtn');
            const closeHandler = () => {
                resolve();
            };
            button.addEventListener('click', closeHandler, { once: true });
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
export const validationAlert = new ValidationAlert();