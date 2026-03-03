class FaqPage {
    constructor() {
        this.faqItems = [];
    }

    init() {
        console.log('❓ Inicializando página de FAQ...');
        
        // Obtener todos los items del acordeón
        this.faqItems = document.querySelectorAll('.faq-item');
        
        // Agregar event listeners
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                this.toggleItem(item);
            });
        });

        console.log('✅ FAQ listo');
    }

    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        if (isActive) {
            // Cerrar el item actual
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        } else {
            // Cerrar todos los demás items de la misma categoría (opcional)
            const category = item.closest('.faq-category');
            const categoryItems = category.querySelectorAll('.faq-item');
            
            categoryItems.forEach(catItem => {
                catItem.classList.remove('active');
                catItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Abrir el item clickeado
            item.classList.add('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const page = new FaqPage();
    page.init();
});