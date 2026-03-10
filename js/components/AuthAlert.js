export class AuthAlert {
    constructor() {
        this.overlay = null;
        this.alert = null;
        this.init();
    }

    /**
     * Inicializar componente
     */
    init() {
        this.createAlert();
    }

    /**
     * Crear estructura del alert
     */
    createAlert() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'auth-alert-overlay';
        
        // Crear alert
        this.alert = document.createElement('div');
        this.alert.className = 'auth-alert';
        this.alert.innerHTML = `
            <div class="auth-alert-icon"></div>
            <h3 class="auth-alert-title"></h3>
            <p class="auth-alert-message"></p>
            <button class="btn btn-primary auth-alert-button">Entendido</button>
        `;

        this.overlay.appendChild(this.alert);
        document.body.appendChild(this.overlay);

        // Evento del botón
        const button = this.alert.querySelector('.auth-alert-button');
        button.addEventListener('click', () => {
            this.hide();
        });

        // Cerrar con click en overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.hide();
            }
        });
    }

    /**
     * Mostrar alerta de éxito
     */
    success(title, message, callback) {
        this.show({
            type: 'success',
            title: title,
            message: message,
            icon: '✓',
            callback: callback
        });
    }

    /**
     * Mostrar alerta de error
     */
    error(title, message, callback) {
        this.show({
            type: 'error',
            title: title,
            message: message,
            icon: '✕',
            callback: callback
        });
    }

    /**
     * Mostrar alerta de advertencia
     */
    warning(title, message, callback) {
        this.show({
            type: 'warning',
            title: title,
            message: message,
            icon: '⚠',
            callback: callback
        });
    }

    /**
     * Mostrar alerta de info
     */
    info(title, message, callback) {
        this.show({
            type: 'info',
            title: title,
            message: message,
            icon: 'ⓘ',
            callback: callback
        });
    }

    /**
     * Mostrar alerta
     */
    show(config) {
        const { type, title, message, icon, callback } = config;

        // Guardar callback
        this.currentCallback = callback;

        // Actualizar contenido
        const iconEl = this.alert.querySelector('.auth-alert-icon');
        const titleEl = this.alert.querySelector('.auth-alert-title');
        const messageEl = this.alert.querySelector('.auth-alert-message');

        iconEl.textContent = icon;
        titleEl.textContent = title;
        messageEl.textContent = message;

        // Actualizar tipo
        this.alert.className = `auth-alert auth-alert-${type}`;

        // Mostrar
        this.overlay.style.display = 'flex';
        setTimeout(() => {
            this.overlay.classList.add('show');
        }, 10);
    }

    /**
     * Ocultar alerta
     */
    hide() {
        this.overlay.classList.remove('show');
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
            
            // Ejecutar callback si existe
            if (this.currentCallback) {
                this.currentCallback();
                this.currentCallback = null;
            }
        }, 300);
    }
}

// Instancia singleton
export const authAlert = new AuthAlert();