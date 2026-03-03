import { guiaModal } from '../components/GuiaModal.js';

class GuiasPage {
    constructor() {
        this.guiaButtons = [];
    }

    init() {
        console.log('📚 Inicializando página de guías...');
        
        // Obtener todos los botones "Leer más"
        this.guiaButtons = document.querySelectorAll('[data-guia]');
        
        // Agregar event listeners
        this.guiaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const guiaId = button.getAttribute('data-guia');
                guiaModal.show(guiaId);
            });
        });

        console.log('✅ Guías listas');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const page = new GuiasPage();
    page.init();
});