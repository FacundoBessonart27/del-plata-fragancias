export class GuiaModal {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.currentGuia = null;
        this.init();
    }

    init() {
        // Crear overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'guia-modal-overlay';

        // Crear modal
        this.modal = document.createElement('div');
        this.modal.className = 'guia-modal';
        
        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);

        // Eventos
        this.bindEvents();
    }

    bindEvents() {
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

    // Mostrar modal con contenido de guía específica

    show(guiaId) {
        const contenido = this.getGuiaContenido(guiaId);
        
        if (!contenido) {
            console.error('Guía no encontrada:', guiaId);
            return;
        }

        this.currentGuia = guiaId;
        this.renderContenido(contenido);
        
        this.overlay.style.display = 'flex';
        setTimeout(() => {
            this.overlay.classList.add('show');
        }, 10);
    }

    renderContenido(contenido) {
        this.modal.innerHTML = `
            <button class="guia-modal-close" id="guiaModalClose" aria-label="Cerrar">×</button>
            
            <div class="guia-modal-header">
                <div class="guia-modal-icon">${contenido.icon}</div>
                <h2 class="guia-modal-title">${contenido.titulo}</h2>
                <p class="guia-modal-subtitle">${contenido.subtitulo}</p>
            </div>

            <div class="guia-modal-body">
                ${contenido.contenido}
            </div>

            <div class="guia-modal-footer">
                <a href="catalogo.html" class="btn btn-primary">Ver Catálogo</a>
                <button class="btn btn-secondary" id="guiaModalCloseBtn">Cerrar</button>
            </div>
        `;

        // Eventos de botones de cierre
        document.getElementById('guiaModalClose').addEventListener('click', () => this.close());
        document.getElementById('guiaModalCloseBtn').addEventListener('click', () => this.close());
    }

    close() {
        this.overlay.classList.remove('show');
        setTimeout(() => {
            this.overlay.style.display = 'none';
        }, 300);
    }

    /**
     * Obtener contenido de cada guía
     */
    getGuiaContenido(guiaId) {
        const guias = {
            familias: {
                icon: '🌸',
                titulo: 'Familias Olfativas',
                subtitulo: 'Descubre las principales familias y sus características',
                contenido: `
                    <h3>Principales Familias Olfativas:</h3>
                    
                    <div class="guia-info-section">
                        <h4>🌸 Florales</h4>
                        <p>Románticas, frescas y delicadas. Perfectas para el día y ocasiones casuales.</p>
                        <ul>
                            <li>Notas: Rosa, jazmín, lirio, violeta</li>
                            <li>Ideales para: Primavera, verano, uso diario</li>
                            <li>Ejemplos: Chanel Nº5, Dior J'adore</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🔥 Orientales</h4>
                        <p>Cálidas, especiadas y sensuales. Perfectas para la noche y eventos especiales.</p>
                        <ul>
                            <li>Notas: Vainilla, ámbar, especias, incienso</li>
                            <li>Ideales para: Otoño, invierno, noche</li>
                            <li>Ejemplos: Black Opium, Scandal</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🍋 Cítricas</h4>
                        <p>Frescas, energizantes y ligeras. Ideales para verano y deporte.</p>
                        <ul>
                            <li>Notas: Limón, naranja, bergamota, pomelo</li>
                            <li>Ideales para: Verano, mañana, deporte</li>
                            <li>Ejemplos: Acqua di Gio, Light Blue</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🌲 Amaderadas</h4>
                        <p>Masculinas, elegantes y sofisticadas. Versátiles para cualquier ocasión.</p>
                        <ul>
                            <li>Notas: Cedro, sándalo, vetiver, pachulí</li>
                            <li>Ideales para: Todo el año, oficina, eventos</li>
                            <li>Ejemplos: Sauvage, Bleu de Chanel</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🍃 Fougère</h4>
                        <p>Clásicas, versátiles y refinadas. El arquetipo de la perfumería masculina.</p>
                        <ul>
                            <li>Notas: Lavanda, musgo de roble, cumarina</li>
                            <li>Ideales para: Cualquier ocasión, atemporal</li>
                            <li>Ejemplos: Paco Rabanne 1 Million</li>
                        </ul>
                    </div>
                `
            },

            concentracion: {
                icon: '💧',
                titulo: 'Tipos de Concentración',
                subtitulo: 'Entiende las diferencias entre cada tipo de fragancia',
                contenido: `
                    <h3>Concentraciones de Perfume:</h3>

                    <div class="guia-info-section">
                        <h4>💎 Parfum (Extracto de Perfume)</h4>
                        <p><strong>Concentración:</strong> 15-40% de aceites esenciales</p>
                        <ul>
                            <li>Duración: 8-12 horas</li>
                            <li>Proyección: Muy intensa</li>
                            <li>Precio: El más alto</li>
                            <li>Uso: Ocasiones especiales, noche</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>✨ EDP - Eau de Parfum</h4>
                        <p><strong>Concentración:</strong> 10-20% de aceites esenciales</p>
                        <ul>
                            <li>Duración: 6-8 horas</li>
                            <li>Proyección: Intensa</li>
                            <li>Precio: Medio-alto</li>
                            <li>Uso: Uso diario, versatilidad</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>💫 EDT - Eau de Toilette</h4>
                        <p><strong>Concentración:</strong> 5-15% de aceites esenciales</p>
                        <ul>
                            <li>Duración: 4-6 horas</li>
                            <li>Proyección: Media</li>
                            <li>Precio: Medio</li>
                            <li>Uso: Día, oficina, clima cálido</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🌊 EDC - Eau de Cologne</h4>
                        <p><strong>Concentración:</strong> 2-5% de aceites esenciales</p>
                        <ul>
                            <li>Duración: 2-4 horas</li>
                            <li>Proyección: Ligera</li>
                            <li>Precio: Bajo</li>
                            <li>Uso: Refrescar, verano, deporte</li>
                        </ul>
                    </div>

                    <p class="guia-tip">
                        <strong>💡 Consejo:</strong> Para uso diario, EDP es la mejor opción 
                        por su equilibrio entre duración y precio.
                    </p>
                `
            },

            elegir: {
                icon: '✨',
                titulo: 'Cómo Elegir tu Perfume Ideal',
                subtitulo: 'El proceso completo para encontrar tu fragancia perfecta',
                contenido: `
                    <h3>Guía Paso a Paso:</h3>

                    <div class="guia-info-section">
                        <h4>1. Conoce tu Estilo</h4>
                        <ul>
                            <li>¿Prefieres aromas frescos o intensos?</li>
                            <li>¿Dulces o amaderados?</li>
                            <li>¿Florales o cítricos?</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>2. Considera la Ocasión</h4>
                        <ul>
                            <li>Día: Frescas, ligeras (cítricas, florales)</li>
                            <li>Noche: Intensas, sensuales (orientales, amaderadas)</li>
                            <li>Oficina: Discretas, profesionales (EDT florales o fougère)</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>3. Prueba en tu Piel</h4>
                        <ul>
                            <li>Nunca compres sin probar primero</li>
                            <li>Cada piel reacciona diferente a las fragancias</li>
                            <li>Prueba en la muñeca, no en papel</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>4. Espera 30 Minutos</h4>
                        <ul>
                            <li>Las notas de salida desaparecen rápido</li>
                            <li>Las notas de corazón tardan en aparecer</li>
                            <li>El aroma evoluciona con el tiempo</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>5. No Pruebes Más de 3</h4>
                        <ul>
                            <li>Tu nariz se satura fácilmente</li>
                            <li>Después de 3, no distingues bien</li>
                            <li>Mejor volver otro día</li>
                        </ul>
                    </div>

                    <p class="guia-tip">
                        <strong>💡 Consejo Final:</strong> Confía en tu instinto. 
                        El perfume perfecto es el que te hace sentir bien.
                    </p>
                `
            },

            aplicar: {
                icon: '✨',
                titulo: 'Cómo Aplicar Correctamente',
                subtitulo: 'Maximiza la duración y proyección de tu fragancia',
                contenido: `
                    <h3>Técnicas de Aplicación:</h3>

                    <div class="guia-info-section">
                        <h4>📍 Puntos de Pulso</h4>
                        <p>Aplica en zonas donde sientes el latido del corazón:</p>
                        <ul>
                            <li>Muñecas (interior)</li>
                            <li>Cuello (laterales)</li>
                            <li>Detrás de las orejas</li>
                            <li>Codos internos</li>
                            <li>Detrás de las rodillas (opcional)</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>📏 Distancia Correcta</h4>
                        <ul>
                            <li>Mantén el frasco a 15-20 cm de la piel</li>
                            <li>Esto asegura distribución uniforme</li>
                            <li>Evita concentrar en un solo punto</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>❌ NO Frotar</h4>
                        <ul>
                            <li>Dejar secar naturalmente</li>
                            <li>Frotar rompe las moléculas</li>
                            <li>Altera el aroma original</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>💧 Hidratar Primero</h4>
                        <ul>
                            <li>Usa loción sin aroma antes</li>
                            <li>La piel hidratada retiene mejor</li>
                            <li>Mayor duración garantizada</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>💇 Cabello (con cuidado)</h4>
                        <ul>
                            <li>Aplica en el cepillo, no directo</li>
                            <li>El alcohol puede resecar el cabello</li>
                            <li>Aroma duradero en el movimiento</li>
                        </ul>
                    </div>

                    <p class="guia-tip">
                        <strong>⚠️ Importante:</strong> Menos es más. 
                        2-3 pulverizaciones son suficientes.
                    </p>
                `
            },

            ocasion: {
                icon: '🌙',
                titulo: 'Perfumes Según la Ocasión',
                subtitulo: 'Elige la fragancia perfecta para cada momento',
                contenido: `
                    <h3>Guía por Ocasión:</h3>

                    <div class="guia-info-section">
                        <h4>💼 Oficina / Trabajo</h4>
                        <ul>
                            <li>Tipo: Frescas, discretas, profesionales</li>
                            <li>Concentración: EDT (no muy intensa)</li>
                            <li>Familias: Cítricas, florales suaves, fougère</li>
                            <li>Ejemplos: Lacoste Blanc, Light Blue</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>☀️ Día Casual</h4>
                        <ul>
                            <li>Tipo: Frescas, naturales, ligeras</li>
                            <li>Concentración: EDT o EDC</li>
                            <li>Familias: Cítricas, florales, acuáticas</li>
                            <li>Ejemplos: Acqua di Gio, CK One</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🌙 Noche / Fiesta</h4>
                        <ul>
                            <li>Tipo: Intensas, sensuales, potentes</li>
                            <li>Concentración: EDP o Parfum</li>
                            <li>Familias: Orientales, amaderadas intensas</li>
                            <li>Ejemplos: Black Opium, Scandal</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>💕 Cita Romántica</h4>
                        <ul>
                            <li>Tipo: Sensuales, dulces, cautivadoras</li>
                            <li>Concentración: EDP</li>
                            <li>Familias: Florales orientales, gourmand</li>
                            <li>Ejemplos: La Vie Est Belle, Good Girl</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🏃 Deporte / Gimnasio</h4>
                        <ul>
                            <li>Tipo: Acuáticas, cítricas, muy ligeras</li>
                            <li>Concentración: EDC</li>
                            <li>Familias: Cítricas energéticas, acuáticas</li>
                            <li>Ejemplos: Davidoff Cool Water Sport</li>
                        </ul>
                    </div>

                    <p class="guia-tip">
                        <strong>💡 Regla de Oro:</strong> La intensidad del perfume 
                        debe ser inversamente proporcional a la cercanía con otras personas.
                    </p>
                `
            },

            conservar: {
                icon: '🏺',
                titulo: 'Cómo Conservar tus Perfumes',
                subtitulo: 'Mantén tus fragancias frescas por años',
                contenido: `
                    <h3>Consejos de Almacenamiento:</h3>

                    <div class="guia-info-section">
                        <h4>☀️ Evita la Luz</h4>
                        <ul>
                            <li>La luz solar oxida el perfume</li>
                            <li>Guarda en lugar oscuro</li>
                            <li>El armario es mejor que el tocador</li>
                            <li>Mantén en su caja original</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🌡️ Temperatura Constante</h4>
                        <ul>
                            <li>Ideal: 15-20°C</li>
                            <li>NO en el baño (humedad y calor)</li>
                            <li>NO cerca de ventanas</li>
                            <li>Evita cambios bruscos de temperatura</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>💧 Controla la Humedad</h4>
                        <ul>
                            <li>La humedad acelera la oxidación</li>
                            <li>El baño NO es un buen lugar</li>
                            <li>Preferible ambiente seco</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>🔒 Cierra Bien</h4>
                        <ul>
                            <li>Tapa siempre cerrada herméticamente</li>
                            <li>El aire oxida el perfume</li>
                            <li>Usa atomizador original (mejor sellado)</li>
                        </ul>
                    </div>

                    <div class="guia-info-section">
                        <h4>📦 Posición Vertical</h4>
                        <ul>
                            <li>Almacena siempre de pie</li>
                            <li>NUNCA de lado</li>
                            <li>Evita movimientos bruscos</li>
                            <li>No agites el frasco</li>
                        </ul>
                    </div>

                    <p class="guia-tip">
                        <strong>⏰ Vida Útil:</strong> Un perfume bien conservado 
                        puede durar 3-5 años sin perder calidad.
                    </p>
                `
            }
        };

        return guias[guiaId] || null;
    }
}

// Instancia singleton
export const guiaModal = new GuiaModal();