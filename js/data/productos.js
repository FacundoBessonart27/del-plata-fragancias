export const PRODUCTOS = [
    {
        id: 'black-opium',
        nombre: 'Yves Saint Laurent Black Opium',
        marca: 'Yves Saint Laurent',
        tipo: 'EDP',
        genero: 'mujer',
        precio: 4145,
        precioOriginal: null, // Para descuentos futuros
        descripcionCorta: 'Una fragancia adictiva y seductora que combina café negro, vainilla blanca y flor de naranjo. Perfecta para la mujer moderna que no teme expresar su sensualidad.',
        descripcionLarga: 'Black Opium de Yves Saint Laurent es una fragancia audaz y seductora que captura la esencia de la feminidad moderna. Este perfume oriental floral combina notas intensas de café negro con la dulzura envolvente de la vainilla blanca, creando una experiencia olfativa única y adictiva.',
        tagline: 'Intensa · Seductora · Adictiva',
        tamaño: '100 ml',
        familiaOlfativa: 'Oriental Floral',
        ocasion: 'Noche / Eventos',
        notas: {
            salida: ['Pera', 'Flor de Naranjo', 'Pimienta Rosa'],
            corazon: ['Café', 'Jazmín', 'Almendra Amarga', 'Regaliz'],
            fondo: ['Vainilla', 'Pachulí', 'Cedro']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/BlackOpium.jpg',
            galeria: [
                'assets/img/CatalogoIMG/BlackOpium.jpg',
                'assets/img/CatalogoIMG/BlackOpium2.jpg',
                'assets/img/CatalogoIMG/BlackOpium3.jpg',
                'assets/img/CatalogoIMG/BlackOpium4.jpg'
            ]
        },
        stock: 15,
        destacado: true,
        nuevo: true,
        badges: ['nuevo']
    },
    {
        id: 'dior-sauvage',
        nombre: 'Dior Sauvage',
        marca: 'Dior',
        tipo: 'EDT',
        genero: 'hombre',
        precio: 3635,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia fresca e intensa con notas amaderadas y especiadas. El perfume masculino más icónico de Dior.',
        descripcionLarga: 'Sauvage es la fragancia de un hombre tan libre como lo salvaje, en un espacio abierto de horizontes infinitos bajo un cielo ardiente.',
        tagline: 'Fresco · Intenso · Noble',
        tamaño: '100 ml',
        familiaOlfativa: 'Aromática Fougère',
        ocasion: 'Día / Oficina',
        notas: {
            salida: ['Bergamota de Calabria', 'Pimienta'],
            corazon: ['Pimienta de Sichuan', 'Lavanda', 'Elemi'],
            fondo: ['Ambroxán', 'Cedro', 'Labdanum']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/DiorSauvageEDT.jpg',
            galeria: [
                'assets/img/CatalogoIMG/DiorSauvageEDT.jpg',
                'assets/img/CatalogoIMG/DiorSauvageEDT2.jpg',
                'assets/img/CatalogoIMG/DiorSauvageEDT3.jpg',
                'assets/img/CatalogoIMG/DiorSauvageEDT4.jpg'
            ]
        },
        stock: 20,
        destacado: true,
        nuevo: false,
        badges: ['popular']
    },
    {
        id: 'chanel-coco-mademoiselle',
        nombre: 'Chanel Coco Mademoiselle',
        marca: 'Chanel',
        tipo: 'EDP',
        genero: 'mujer',
        precio: 6465,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia elegante y fresca con notas cítricas y florales. La esencia de la mujer moderna y sofisticada.',
        descripcionLarga: 'Coco Mademoiselle es una fragancia oriental ambarina. Una declaración de independencia y audacia.',
        tagline: 'Elegante · Fresca · Sensual',
        tamaño: '100 ml',
        familiaOlfativa: 'Oriental Floral',
        ocasion: 'Día / Noche',
        notas: {
            salida: ['Naranja', 'Bergamota', 'Pomelo'],
            corazon: ['Rosa', 'Jazmín', 'Lichi'],
            fondo: ['Pachulí', 'Vainilla', 'Vetiver']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/ChannelCoco.jpg',
            galeria: [
                'assets/img/CatalogoIMG/ChannelCoco.jpg',
                'assets/img/CatalogoIMG/ChannelCoco2.jpg',
                'assets/img/CatalogoIMG/ChannelCoco3.jpg',
                'assets/img/CatalogoIMG/ChannelCoco4.jpg'
            ]
        },
        stock: 10,
        destacado: true,
        nuevo: false,
        badges: []
    },
    {
        id: 'paco-rabanne-one-million',
        nombre: 'Paco Rabanne 1 Million',
        marca: 'Paco Rabanne',
        tipo: 'EDT',
        genero: 'hombre',
        precio: 4375,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia audaz y dulce con notas especiadas. Para el hombre que no teme destacar.',
        descripcionLarga: 'One Million es la expresión de cada hombre. Un perfume con carácter, audaz y sensual.',
        tagline: 'Audaz · Dulce · Provocador',
        tamaño: '100 ml',
        familiaOlfativa: 'Oriental Especiada',
        ocasion: 'Noche / Fiesta',
        notas: {
            salida: ['Pomelo', 'Menta', 'Mandarina'],
            corazon: ['Canela', 'Rosa', 'Especias'],
            fondo: ['Ámbar', 'Cuero', 'Madera']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/1MillionPacoRabbane.jpg',
            galeria: [
                'assets/img/CatalogoIMG/1MillionPacoRabbane.jpg',
                'assets/img/CatalogoIMG/1MillionPacoRabbane2.jpg',
                'assets/img/CatalogoIMG/1MillionPacoRabbane3.jpg',
                'assets/img/CatalogoIMG/1MillionPacoRabbane4.jpg'
            ]
        },
        stock: 8,
        destacado: false,
        nuevo: false,
        badges: ['exclusivo']
    },
    {
        id: 'carolina-herrera-good-girl',
        nombre: 'Carolina Herrera Good Girl',
        marca: 'Carolina Herrera',
        tipo: 'EDP',
        genero: 'mujer',
        precio: 9140,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia misteriosa y glamorosa. El equilibrio perfecto entre dulzura y sensualidad.',
        descripcionLarga: 'Good Girl es la fragancia que celebra la dualidad de la mujer moderna. Buena por naturaleza, mala por elección.',
        tagline: 'Misteriosa · Glamorosa · Única',
        tamaño: '80 ml',
        familiaOlfativa: 'Oriental Floral',
        ocasion: 'Noche / Eventos',
        notas: {
            salida: ['Almendra', 'Café'],
            corazon: ['Jazmín', 'Tuberosa', 'Iris'],
            fondo: ['Tonka', 'Cacao', 'Vainilla', 'Sándalo']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/CarolinaHerraraGoodGirl.jpg',
            galeria: [
                'assets/img/CatalogoIMG/CarolinaHerraraGoodGirl.jpg',
                'assets/img/CatalogoIMG/CarolinaHerraraGoodGirl2.jpg',
                'assets/img/CatalogoIMG/CarolinaHerraraGoodGirl3.jpg',
                'assets/img/CatalogoIMG/CarolinaHerraraGoodGirl4.jpg'
            ]
        },
        stock: 5,
        destacado: true,
        nuevo: false,
        badges: []
    },
    {
        id: 'lacoste-blanc',
        nombre: 'Lacoste L.12.12 Blanc',
        marca: 'Lacoste',
        tipo: 'EDT',
        genero: 'hombre',
        precio: 3095,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia fresca y elegante para el hombre moderno y versátil.',
        descripcionLarga: 'L.12.12 Blanc captura la esencia de la icónica camisa polo blanca: fresca, elegante y atemporal.',
        tagline: 'Fresco · Elegante · Versátil',
        tamaño: '100 ml',
        familiaOlfativa: 'Aromática',
        ocasion: 'Día / Casual',
        notas: {
            salida: ['Pomelo', 'Romero', 'Cardamomo'],
            corazon: ['Ylang-ylang', 'Tuberosa'],
            fondo: ['Cedro de Virginia', 'Gamuza', 'Vetiver']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/lacosteBlanc.jpg',
            galeria: [
                'assets/img/CatalogoIMG/lacosteBlanc.jpg',
                'assets/img/CatalogoIMG/lacosteBlanc2.jpg',
                'assets/img/CatalogoIMG/lacosteBlanc3.jpg',
                'assets/img/CatalogoIMG/lacosteBlanc4.jpg'
            ]
        },
        stock: 12,
        destacado: false,
        nuevo: false,
        badges: []
    },
    {
        id: 'lancome-la-vie-est-belle',
        nombre: 'Lancôme La Vie Est Belle',
        marca: 'Lancôme',
        tipo: 'EDP',
        genero: 'mujer',
        precio: 6150,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia dulce y floral con acordes gourmand. La vida es bella.',
        descripcionLarga: 'La Vie Est Belle es una fragancia que celebra la felicidad. Un perfume floral gourmand único.',
        tagline: 'Dulce · Floral · Gourmand',
        tamaño: '100 ml',
        familiaOlfativa: 'Floral Frutal Gourmand',
        ocasion: 'Día / Noche',
        notas: {
            salida: ['Pera', 'Grosella Negra'],
            corazon: ['Iris', 'Jazmín', 'Flor de Naranjo'],
            fondo: ['Praliné', 'Vainilla', 'Pachulí', 'Tonka']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/LancomeLaVie.jpg',
            galeria: [
                'assets/img/CatalogoIMG/LancomeLaVie.jpg',
                'assets/img/CatalogoIMG/LancomeLaVie2.jpg',
                'assets/img/CatalogoIMG/LancomeLaVie3.jpg',
                'assets/img/CatalogoIMG/LancomeLaVie4.jpg'
            ]
        },
        stock: 18,
        destacado: true,
        nuevo: false,
        badges: ['popular']
    },
    {
        id: 'versace-eros',  
        nombre: 'Versace Eros',
        marca: 'Versace',
        tipo: 'EDT',
        genero: 'hombre',
        precio: 4530,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia potente y vibrante inspirada en el dios griego del amor. Para el hombre apasionado y seguro de sí mismo.',
        descripcionLarga: 'Eros de Versace es una fragancia masculina fresca, amaderada y ligeramente oriental. Inspirada en la mitología griega, representa el poder de la pasión y el deseo.',
        tagline: 'Potente · Vibrante · Apasionado',
        tamaño: '100 ml',
        familiaOlfativa: 'Aromática Fougère',
        ocasion: 'Noche / Fiesta',
        notas: {
            salida: ['Menta', 'Manzana Verde', 'Limón Italiano'],
            corazon: ['Tonka', 'Geranio', 'Ambroxán'],
            fondo: ['Vainilla de Madagascar', 'Vetiver', 'Musgo de Roble', 'Cedro de Virginia']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/VersaceErosEDT.jpg',
            galeria: [
                'assets/img/CatalogoIMG/VersaceErosEDT.jpg',
                'assets/img/CatalogoIMG/VersaceErosEDT2.jpg',
                'assets/img/CatalogoIMG/VersaceErosEDT3.jpg',
                'assets/img/CatalogoIMG/VersaceErosEDT4.jpg'
            ]
        },
        stock: 16,
        destacado: true,
        nuevo: false,
        badges: ['popular']
    },
    {
        id: 'giorgio-armani-si-passione',
        nombre: 'Giorgio Armani Sì Passione',
        marca: 'Giorgio Armani',
        tipo: 'EDP',
        genero: 'mujer',
        precio: 4155,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia radiante y femenina. Para la mujer apasionada y vibrante.',
        descripcionLarga: 'Sì Passione es una declaración de pasión. Una fragancia brillante y sensual.',
        tagline: 'Radiante · Femenina · Vibrante',
        tamaño: '100 ml',
        familiaOlfativa: 'Floral Frutal',
        ocasion: 'Día / Noche',
        notas: {
            salida: ['Pera', 'Pimienta Rosa', 'Bergamota'],
            corazon: ['Jazmín', 'Heliotropo', 'Rosa'],
            fondo: ['Vainilla', 'Cedro', 'Almizcle Blanco']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/giorgioArmaniEDP.jpg',
            galeria: [
                'assets/img/CatalogoIMG/giorgioArmaniEDP.jpg',
                'assets/img/CatalogoIMG/giorgioArmaniEDP2.jpg',
                'assets/img/CatalogoIMG/giorgioArmaniEDP3.jpg',
                'assets/img/CatalogoIMG/giorgioArmaniEDP4.jpg'
            ]
        },
        stock: 14,
        destacado: false,
        nuevo: false,
        badges: []
    },
    {
        id: 'bleu-de-chanel',
        nombre: 'Bleu de Chanel',
        marca: 'Chanel',
        tipo: 'EDP',
        genero: 'hombre',
        precio: 7160,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia sofisticada y aromática que encarna la libertad. Para el hombre moderno y atemporal.',
        descripcionLarga: 'Bleu de Chanel es un perfume amaderado aromático que celebra la independencia masculina. Una composición atemporal que desafía las convenciones.',
        tagline: 'Sofisticado · Aromático · Atemporal',
        tamaño: '100 ml',
        familiaOlfativa: 'Amaderada Aromática',
        ocasion: 'Día / Noche / Oficina',
        notas: {
            salida: ['Limón', 'Bergamota', 'Menta', 'Artemisa'],
            corazon: ['Pomelo', 'Nuez Moscada', 'Jazmín', 'Melocotón'],
            fondo: ['Incienso', 'Ámbar', 'Cedro', 'Sándalo', 'Pachulí', 'Labdanum']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/channelBleuEDP.jpg',
            galeria: [
                'assets/img/CatalogoIMG/channelBleuEDP.jpg',
                'assets/img/CatalogoIMG/channelBleuEDP2.jpg',
                'assets/img/CatalogoIMG/channelBleuEDP3.jpg',
                'assets/img/CatalogoIMG/channelBleuEDP4.jpg'
            ]
        },
        stock: 9,
        destacado: true,
        nuevo: true,
        badges: ['nuevo']
    },
    {
        id: 'invictus',
        nombre: 'Paco Rabanne Invictus',
        marca: 'Paco Rabanne',
        tipo: 'EDT',
        genero: 'hombre',
        precio: 4118,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia deportiva y fresca que celebra la victoria. Para el hombre triunfante y decidido.',
        descripcionLarga: 'Invictus representa el triunfo absoluto. Una fragancia fresca y vibrante para el hombre invencible que conquista cada desafío.',
        tagline: 'Deportivo · Fresco · Triunfante',
        tamaño: '100 ml',
        familiaOlfativa: 'Amaderada Acuática',
        ocasion: 'Día / Deporte / Casual',
        notas: {
            salida: ['Pomelo', 'Notas Marinas', 'Mandarina'],
            corazon: ['Laurel', 'Jazmín', 'Hojas de Violeta'],
            fondo: ['Ámbar Gris', 'Guayaco', 'Musgo de Roble', 'Pachulí']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/PagoRabaneInvictusEDT.jpg',
            galeria: [
                'assets/img/CatalogoIMG/PagoRabaneInvictusEDT.jpg',
                'assets/img/CatalogoIMG/PagoRabaneInvictusEDT2.jpg',
                'assets/img/CatalogoIMG/PagoRabaneInvictusEDT3.jpg',
                'assets/img/CatalogoIMG/PagoRabaneInvictusEDT4.jpg'
            ]
        },
        stock: 11,
        destacado: false,
        nuevo: false,
        badges: []
    },
    {
        id: 'miss-dior',
        nombre: 'Miss Dior',
        marca: 'Dior',
        tipo: 'EDP',
        genero: 'mujer',
        precio: 5580,
        precioOriginal: null,
        descripcionCorta: 'Una fragancia romántica y floral que cautiva los sentidos. Para la mujer elegante y sofisticada.',
        descripcionLarga: 'Miss Dior es un tributo al amor y a la feminidad. Una explosión de colores frescos y florales que despiertan el optimismo.',
        tagline: 'Romántica · Floral · Cautivadora',
        tamaño: '100 ml',
        familiaOlfativa: 'Chipre Floral',
        ocasion: 'Día / Eventos / Romántica',
        notas: {
            salida: ['Mandarina de Calabria', 'Pimienta Rosa'],
            corazon: ['Rosa de Grasse', 'Peonía', 'Lirio'],
            fondo: ['Iris', 'Almizcle Blanco', 'Tonka', 'Vainilla de Papúa']
        },
        imagenes: {
            principal: 'assets/img/CatalogoIMG/missDiorEDP.jpg',
            galeria: [
                'assets/img/CatalogoIMG/missDiorEDP.jpg',
                'assets/img/CatalogoIMG/missDiorEDP2.jpg',
                'assets/img/CatalogoIMG/missDiorEDP3.jpg',
                'assets/img/CatalogoIMG/missDiorEDP4.jpg'
            ]
        },
        stock: 13,
        destacado: true,
        nuevo: false,
        badges: ['exclusivo']
    }
];


// Exportar para uso en otros módulos
//if (typeof module !== 'undefined' && module.exports) {
//    module.exports = { PRODUCTOS };
//}