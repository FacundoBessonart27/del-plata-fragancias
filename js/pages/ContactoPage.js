import { Validator } from '../utils/validator.js';
import { validationAlert } from '../components/ValidationAlert.js';

class ContactoPage {
    constructor() {
        this.form = null;
    }

    init() {
        console.log('📧 Inicializando página de contacto...');
        
        this.form = document.getElementById('contactoForm');
        if (!this.form) return;

        this.initForm();
        console.log('✅ Formulario de contacto listo');
    }

    initForm() {
        // Validación en tiempo real
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        const subjectSelect = document.getElementById('contactSubject');
        const messageTextarea = document.getElementById('contactMessage');

        nameInput?.addEventListener('blur', () => this.validateName());
        emailInput?.addEventListener('blur', () => this.validateEmail());
        phoneInput?.addEventListener('blur', () => this.validatePhone());
        subjectSelect?.addEventListener('blur', () => this.validateSubject());
        messageTextarea?.addEventListener('blur', () => this.validateMessage());

        // Submit
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    validateName() {
        const input = document.getElementById('contactName');
        const error = document.getElementById('nameError');
        const value = input.value.trim();

        if (!Validator.isValidName(value)) {
            this.showError(input, error, 'El nombre debe tener al menos 3 caracteres');
            return false;
        }

        this.clearError(input, error);
        return true;
    }

    validateEmail() {
        const input = document.getElementById('contactEmail');
        const error = document.getElementById('emailError');
        const value = input.value.trim();

        if (!Validator.isValidEmail(value)) {
            this.showError(input, error, 'Ingresa un email válido');
            return false;
        }

        this.clearError(input, error);
        return true;
    }

    validatePhone() {
        const input = document.getElementById('contactPhone');
        const error = document.getElementById('phoneError');
        const value = input.value.trim();

        // Teléfono es opcional
        if (value === '') {
            this.clearError(input, error);
            return true;
        }

        if (!Validator.isValidPhone(value)) {
            this.showError(input, error, 'Ingresa un teléfono válido (Ej: 099123456)');
            return false;
        }

        this.clearError(input, error);
        return true;
    }

    validateSubject() {
        const select = document.getElementById('contactSubject');
        const error = document.getElementById('subjectError');
        const value = select.value;

        if (value === '') {
            this.showError(select, error, 'Selecciona un asunto');
            return false;
        }

        this.clearError(select, error);
        return true;
    }

    validateMessage() {
        const textarea = document.getElementById('contactMessage');
        const error = document.getElementById('messageError');
        const value = textarea.value.trim();

        if (value.length < 10) {
            this.showError(textarea, error, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }

        this.clearError(textarea, error);
        return true;
    }

    showError(input, errorEl, message) {
        input.classList.add('form-input-error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    clearError(input, errorEl) {
        input.classList.remove('form-input-error');
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    async handleSubmit() {
        console.log('📝 Procesando formulario de contacto...');

        // Validar todos los campos
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();
        const isSubjectValid = this.validateSubject();
        const isMessageValid = this.validateMessage();

        if (!isNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid || !isMessageValid) {
            await validationAlert.show('Por favor, completa correctamente todos los campos obligatorios');
            return;
        }

        // Recopilar datos
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            phone: document.getElementById('contactPhone').value.trim(),
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value.trim()
        };

        console.log('✅ Datos del formulario:', formData);

        // Simular envío (aquí iría la integración con backend)
        try {
            // TODO: Enviar a backend
            // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

            // Por ahora, simular éxito
            await this.showSuccessMessage();
            this.form.reset();
            
        } catch (error) {
            console.error('❌ Error al enviar mensaje:', error);
            await validationAlert.show('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
        }
    }

    async showSuccessMessage() {
    // Importar alerta personalizada de contacto
    try {
        const { contactSuccessAlert } = await import('../components/ContactoAlert.js');
        await contactSuccessAlert.show();
        console.log('✅ Mensaje enviado con éxito');
    } catch (error) {
        console.error('Error al mostrar alerta:', error);
        alert('¡Mensaje enviado con éxito! Te responderemos pronto.');
    }
}
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const page = new ContactoPage();
    page.init();
});