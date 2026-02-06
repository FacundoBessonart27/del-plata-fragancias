//Comportamiento del Header 
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES =====
    const header = document.querySelector('.header-main');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenuLeft = document.querySelector('.navbar-menu-left');
    const navbarMenuRight = document.querySelector('.navbar-menu-right');
    const body = document.body;
    
    let lastScrollTop = 0;
    let scrollThreshold = 100; 
    
    
    // ===== HIDE ON SCROLL DOWN, SHOW ON SCROLL UP =====
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar clase 'scrolled' cuando se hace scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/Show header según dirección del scroll
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling DOWN - Ocultar header
                header.classList.add('hidden');
            } else {
                // Scrolling UP - Mostrar header
                header.classList.remove('hidden');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    
    // ===== MENÚ (MÓVIL) =====
    if (navbarToggle) {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.classList.add('navbar-overlay');
        document.body.appendChild(overlay);
        // Crear menú móvil unificado
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        // Crear lista unificada de navegación
        const mobileNavList = document.createElement('ul');
        mobileNavList.classList.add('mobile-nav-list');
        
        // Obtener todos los links de ambos menús
        const leftLinks = navbarMenuLeft.querySelectorAll('.navbar-item');
        const rightLinks = navbarMenuRight.querySelectorAll('.navbar-item');
        // Agregar links del menú izquierdo
        leftLinks.forEach(item => {
            const clonedItem = item.cloneNode(true);
            mobileNavList.appendChild(clonedItem);
        });
        
        // Agregar links del menú derecho
        rightLinks.forEach(item => {
            const clonedItem = item.cloneNode(true);
            mobileNavList.appendChild(clonedItem);
        });
        
        mobileMenu.appendChild(mobileNavList);
        document.body.appendChild(mobileMenu);
        
        // Toggle del menú
        navbarToggle.addEventListener('click', function() {
            const isActive = navbarToggle.classList.contains('active');
            
            if (isActive) {
                // Cerrar menú
                closeMenu();
            } else {
                // Abrir menú
                openMenu();
            }
        });
        
        // Cerrar menú al hacer click en overlay
        overlay.addEventListener('click', function() {
            closeMenu();
        });
         // Cerrar menú al hacer click en un link
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('navbar-link')) {
                closeMenu();
            }
        });
        // Funciones para abrir/cerrar menú
        function openMenu() {
            navbarToggle.classList.add('active');
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            navbarToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
        
        // Cerrar menú al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
    
});
    
