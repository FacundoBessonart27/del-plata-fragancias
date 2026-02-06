//Comportamiento del Header 
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== VARIABLES =====
    const header = document.querySelector('.header-main');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenuLeft = document.querySelector('.navbar-menu-left');
    const navbarMenuRight = document.querySelector('.navbar-menu-right');
    const body = document.body;
    
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Píxeles antes de activar hide/show
    
    
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
        const navLinks = document.querySelectorAll('.navbar-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
        
        // Funciones para abrir/cerrar menú
        function openMenu() {
            navbarToggle.classList.add('active');
            navbarMenuLeft.classList.add('active');
            navbarMenuRight.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden'; // Bloquear scroll del body
        }
        
        function closeMenu() {
            navbarToggle.classList.remove('active');
            navbarMenuLeft.classList.remove('active');
            navbarMenuRight.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = ''; // Restaurar scroll del body
        }
        
        // Cerrar menú al cambiar tamaño de ventana (si se pasa a desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
});