import { authAlert } from '../components/AuthAlert.js';
class AuthPage {
    constructor() {
        this.currentForm = 'login';
        this.init();
    }

    /**
     * Inicializar página
     */
    init() {
        this.setupTabs();
        this.setupSwitchLinks();
        this.setupPasswordToggles();
        this.setupForms();
        this.setupPasswordStrength();
        this.checkExistingSession();
        this.setupSocialButtons()
    }

    /**
     * Configurar tabs
     */
    setupTabs() {
        const tabs = document.querySelectorAll('.auth-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetForm = tab.dataset.tab;
                this.switchForm(targetForm);
            });
        });
    }

    /**
     * Configurar enlaces de cambio
     */
    setupSwitchLinks() {
        const switchLinks = document.querySelectorAll('.auth-switch-link');
        
        switchLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetForm = link.dataset.switch;
                this.switchForm(targetForm);
            });
        });
    }

    /**
     * Cambiar entre formularios
     */
    switchForm(formType) {
        // Actualizar estado
        this.currentForm = formType;

        // Actualizar tabs
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => {
            if (tab.dataset.tab === formType) {
                tab.classList.add('auth-tab-active');
            } else {
                tab.classList.remove('auth-tab-active');
            }
        });

        // Actualizar formularios
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => {
            form.classList.remove('auth-form-active');
        });

        const activeForm = document.getElementById(formType === 'login' ? 'loginForm' : 'registerForm');
        if (activeForm) {
            activeForm.classList.add('auth-form-active');
        }
    }

    /**
     * Configurar toggles de contraseña
     */
    setupPasswordToggles() {
        const toggles = document.querySelectorAll('.password-toggle');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.dataset.target;
                const input = document.getElementById(targetId);
                
                if (input.type === 'password') {
                    input.type = 'text';
                    toggle.querySelector('.password-toggle-icon').textContent = '🙈';
                } else {
                    input.type = 'password';
                    toggle.querySelector('.password-toggle-icon').textContent = '👁️';
                }
            });
        });
    }

    /**
     * Configurar indicador de fortaleza de contraseña
     */
    setupPasswordStrength() {
        const passwordInput = document.getElementById('registerPassword');
        if (!passwordInput) return;

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.calculatePasswordStrength(password);
            this.updatePasswordStrengthUI(strength);
        });
    }

    /**
     * Calcular fortaleza de contraseña
     */
    calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 10;

        return Math.min(strength, 100);
    }

    /**
     * Actualizar UI de fortaleza
     */
    updatePasswordStrengthUI(strength) {
        const fill = document.querySelector('.password-strength-fill');
        const text = document.querySelector('.password-strength-text');
        
        if (!fill || !text) return;

        fill.style.width = `${strength}%`;

        if (strength < 40) {
            text.textContent = 'Contraseña débil';
            text.style.color = '#d32f2f';
        } else if (strength < 70) {
            text.textContent = 'Contraseña moderada';
            text.style.color = '#ff9800';
        } else {
            text.textContent = 'Contraseña fuerte';
            text.style.color = '#4caf50';
        }
    }

    /**
     * Configurar manejo de formularios
     */
    setupForms() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(e);
            });
        }
    }

    /**
     * Manejar login
     */
    handleLogin(e) {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        console.log('🔐 Login attempt:', { email, rememberMe });

        // Simular autenticación
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Login exitoso
            const sessionData = {
                email: user.email,
                name: user.name,
                loggedIn: true,
                timestamp: new Date().toISOString()
            };

            // Guardar sesión
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(sessionData));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
            }

            this.showSuccess('¡Bienvenido de nuevo!', () => {
                window.location.href = '../index.html';
            });
        } else {
            this.showError('Email o contraseña incorrectos');
        }
    }

    /**
     * Manejar registro
     */
    handleRegister(e) {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        console.log('📝 Register attempt:', { name, email });

        // Validaciones
        if (password !== passwordConfirm) {
            this.showError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 8) {
            this.showError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (!acceptTerms) {
            this.showError('Debes aceptar los términos y condiciones');
            return;
        }

        // Verificar si el usuario ya existe
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.email === email);

        if (existingUser) {
            this.showError('Este email ya está registrado');
            return;
        }

        // Crear usuario
        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // En producción NUNCA guardar contraseñas en texto plano
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login después del registro
        const sessionData = {
            email: newUser.email,
            name: newUser.name,
            loggedIn: true,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(sessionData));

        this.showSuccess('¡Cuenta creada exitosamente!', () => {
            window.location.href = '../index.html';
        });
    }

    /**
     * Verificar sesión existente
     */
    checkExistingSession() {
        const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
        
        if (currentUser) {
            const user = JSON.parse(currentUser);
            console.log('👤 Usuario ya autenticado:', user.name);
            
            // Opcionalmente redirigir automáticamente
            // window.location.href = '../index.html';
        }
    }

/**
 * Configurar botones sociales
 */
setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.btn-social');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('btn-social-google') ? 'Google' : 'Facebook';
            authAlert.info(
                'Próximamente',
                `La autenticación con ${platform} estará disponible pronto. Por ahora, puedes crear una cuenta con email.`
            );
        });
    });
}



    /**
 * Mostrar mensaje de éxito
 */
showSuccess(message, callback) {
    authAlert.success('¡Éxito!', message, callback);
}

/**
 * Mostrar mensaje de error
 */
showError(message) {
    authAlert.error('Error', message);
}

/**
 * Mostrar mensaje de advertencia
 */
showWarning(message) {
    authAlert.warning('Atención', message);
}

/**
 * Mostrar mensaje de información
 */
showInfo(message) {
    authAlert.info('Información', message);
}
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AuthPage();
});