export class ContactSuccessAlert {
    constructor() {
        this.overlay = null;
        this.alert = null;
        this.init();
    }

    init() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'contact-success-overlay';

        // Crear alerta
        this.alert = document.createElement('div');
        this.alert.className = 'contact-success-alert';
        this.alert.innerHTML = `
            <div class="contact-success-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="38" stroke="#C9A05C" stroke-width="3"/>
                    <path d="M25 40L35 50L55 30" stroke="#C9A05C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3 class="contact-success-title">¡Mensaje Enviado con Éxito!</h3>
            <p class="contact-success-message">
                Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos 
                en menos de 24 horas.
            </p>
            <button class="btn btn-primary contact-success-button" id="contactSuccessBtn">
                Entendido
            </button>
        `;

        this.overlay.appendChild(this.alert);
        document.body.appendChild(this.overlay);

        // Eventos
        this.bindEvents();
    }

    bindEvents() {
        const button = document.getElementById('contactSuccessBtn');
        
        button.addEventListener('click', () => {
            this.close();
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('show')) {
                this.close();
            }
        });

        // Cerrar con click en overlay
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
    }

    show() {
        return new Promise((resolve) => {
            this.overlay.style.display = 'flex';
            setTimeout(() => {
                this.overlay.classList.add('show');
            }, 10);

            const button = document.getElementById('contactSuccessBtn');
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
export const contactSuccessAlert = new ContactSuccessAlert();