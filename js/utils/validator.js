export const Validator = {
    /**
     * Validar email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validar teléfono uruguayo
     * Formatos aceptados: 099123456, 099 123 456, +598 99 123 456
     */
    isValidPhone(phone) {
        const cleaned = phone.replace(/\s+/g, '').replace(/\+598/, '');
        const phoneRegex = /^0[0-9]{8}$/;
        return phoneRegex.test(cleaned);
    },

    /**
     * Validar nombre (mínimo 3 caracteres)
     */
    isValidName(name) {
        return name.trim().length >= 3;
    },

    /**
     * Limpiar teléfono (quitar espacios y +598)
     */
    cleanPhone(phone) {
        return phone.replace(/\s+/g, '').replace(/\+598/, '');
    },

    /**
     * Formatear teléfono para mostrar (099 123 456)
     */
    formatPhone(phone) {
        const cleaned = this.cleanPhone(phone);
        if (cleaned.length === 9) {
            return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        }
        return phone;
    }
};