/*
  ARCHIVO DE CONTENIDO — aquí se edita todo el texto de la página.
  No hace falta tocar index.html, styles.css ni los archivos .js de la carpeta.

  Reglas simples:
  - Cada texto va entre comillas "así".
  - Cada elemento (clase o evento) va entre llaves { ... } y termina con coma.
  - Para borrar una clase o evento, elimina su bloque completo { ... },
  - Para agregar uno, copia un bloque completo, pégalo debajo y cambia los textos.
  - Los eventos cuya fecha ya pasó se ocultan solos.
  - Si un campo no aplica, déjalo vacío: "".

  EVENTOS — campos:
  - categoria: "antioquia", "nacional" o "internacional" (define el filtro).
  - fecha: "AAAA-MM-DD". Si el evento dura varios días, agrega fechaFin.
  - hora y duracionMinutos: solo para eventos de un día. En viajes de varios días se ignoran.
  - imagen: ruta del flyer, por ejemplo "assets/flyers/mi-evento.jpg" (formato vertical 4:5, ideal 1080x1350).
  - imagenAlt: descripción corta del flyer (ayuda a SEO y accesibilidad).
  - enlace: página de inscripción o información. Si queda vacío, no se muestra el botón.
*/

window.CONTENIDO = {
  estudio: {
    nombre: "Nombre del Estudio",
    titulo: "Clases de baile, fincas y viajes bailables desde Colombia",
    lema: "Baila. Conecta. Disfruta.",
    descripcion:
      "Clases para todos los niveles, planes en fincas de Antioquia, socials en Bogotá y Cali, y viajes internacionales para bailar en Argentina, República Dominicana y Brasil.",
    zonaHoraria: "America/Bogota",
  },

  categoriasEventos: {
    antioquia: "Fincas en Antioquia",
    nacional: "Eventos nacionales",
    internacional: "Viajes internacionales",
  },

  calendario: {
    // Pega aquí el enlace de INCRUSTAR de tu Google Calendar público
    // (Google Calendar > Configuración del calendario > Integrar el calendario > "Código para insertar", copia solo la URL del src="...").
    // Si lo dejas vacío, el calendario incrustado no se muestra.
    urlIncrustada: "",
    // Enlace al que irá el botón "Ver calendario completo" (el enlace público de tu calendario).
    // Si lo dejas vacío, el botón no se muestra.
    urlPublica: "",
    // Enlace para reservar/agendar una clase de prueba (Google Calendar Appointment Schedule, Calendly, etc.).
    // Si lo dejas vacío, el botón no se muestra.
    urlReservas: "",
  },

  clases: [
    {
      nombre: "Salsa principiantes",
      dia: "Lunes",
      hora: "19:00",
      duracionMinutos: 60,
      nivel: "Principiante",
      descripcion: "Pasos básicos, ritmo y trabajo en pareja desde cero.",
      precio: "$60.000 COP por clase",
      lugar: "Estudio principal",
    },
    {
      nombre: "Bachata sensual",
      dia: "Miércoles",
      hora: "20:00",
      duracionMinutos: 75,
      nivel: "Intermedio",
      descripcion: "Conexión, giros y fluidez para llevar tu bachata al siguiente nivel.",
      precio: "$65.000 COP por clase",
      lugar: "Estudio principal",
    },
    {
      nombre: "Baile en pareja libre",
      dia: "Sábado",
      hora: "11:00",
      duracionMinutos: 90,
      nivel: "Todos los niveles",
      descripcion: "Clase abierta con mezcla de ritmos. Ideal para probar.",
      precio: "$50.000 COP por clase",
      lugar: "Estudio principal",
    },
  ],

  eventos: [
    {
      categoria: "antioquia",
      nombre: "Pasadía de Salsa en Finca",
      fecha: "2026-11-28",
      hora: "10:00",
      duracionMinutos: 480,
      lugar: "Finca La Esperanza",
      ciudad: "Santa Fe de Antioquia, Antioquia",
      descripcion: "Piscina, almuerzo típico, clases abiertas y social bajo el sol.",
      precio: "$180.000 COP",
      imagen: "assets/flyers/pasadia-salsa-finca.svg",
      imagenAlt: "Flyer del Pasadía de Salsa en Finca, 28 de noviembre en Santa Fe de Antioquia",
      enlace: "",
    },
    {
      categoria: "antioquia",
      nombre: "Retiro Bailable en Finca",
      fecha: "2026-12-12",
      fechaFin: "2026-12-14",
      lugar: "Finca Altos del Retiro",
      ciudad: "El Retiro, Antioquia",
      descripcion: "Fin de semana completo: alojamiento, comidas, talleres y socials de noche.",
      precio: "$520.000 COP",
      imagen: "assets/flyers/retiro-bailable-finca.svg",
      imagenAlt: "Flyer del Retiro Bailable en Finca, del 12 al 14 de diciembre en El Retiro, Antioquia",
      enlace: "",
    },
    {
      categoria: "nacional",
      nombre: "Gran Social Bogotá",
      fecha: "2026-12-05",
      hora: "21:00",
      duracionMinutos: 300,
      lugar: "Salón Central",
      ciudad: "Bogotá",
      descripcion: "Pista abierta, DJ en vivo y mini clase de bienvenida.",
      precio: "$60.000 COP",
      imagen: "assets/flyers/gran-social-bogota.svg",
      imagenAlt: "Flyer del Gran Social Bogotá, 5 de diciembre",
      enlace: "",
    },
    {
      categoria: "nacional",
      nombre: "Cali Salsa Congress",
      fecha: "2026-12-26",
      fechaFin: "2026-12-28",
      lugar: "Sede por confirmar",
      ciudad: "Cali, Valle del Cauca",
      descripcion: "Tres días de talleres, shows y socials en la capital mundial de la salsa.",
      precio: "Desde $350.000 COP",
      imagen: "assets/flyers/cali-salsa-congress.svg",
      imagenAlt: "Flyer del Cali Salsa Congress, del 26 al 28 de diciembre en Cali",
      enlace: "",
    },
    {
      categoria: "internacional",
      nombre: "Bachata Beach Experience",
      fecha: "2027-02-12",
      fechaFin: "2027-02-16",
      lugar: "Resort frente al mar",
      ciudad: "Punta Cana, República Dominicana",
      descripcion: "Cinco días de playa, talleres con maestros locales y fiestas de bachata.",
      precio: "Desde USD 890",
      imagen: "assets/flyers/bachata-beach-punta-cana.svg",
      imagenAlt: "Flyer del viaje Bachata Beach Experience a Punta Cana, del 12 al 16 de febrero de 2027",
      enlace: "",
    },
    {
      categoria: "internacional",
      nombre: "Milonga y Salsa en Buenos Aires",
      fecha: "2027-03-05",
      fechaFin: "2027-03-12",
      lugar: "Barrio de San Telmo",
      ciudad: "Buenos Aires, Argentina",
      descripcion: "Una semana de clases, milongas y noches de baile en la capital argentina.",
      precio: "Desde USD 1.250",
      imagen: "assets/flyers/milonga-salsa-buenos-aires.svg",
      imagenAlt: "Flyer del viaje Milonga y Salsa a Buenos Aires, del 5 al 12 de marzo de 2027",
      enlace: "",
    },
    {
      categoria: "internacional",
      nombre: "Samba y Zouk en Río",
      fecha: "2027-04-02",
      fechaFin: "2027-04-09",
      lugar: "Barrio de Santa Teresa",
      ciudad: "Río de Janeiro, Brasil",
      descripcion: "Samba, zouk y playa: talleres con maestros brasileños y rodas de baile.",
      precio: "Desde USD 1.390",
      imagen: "assets/flyers/samba-zouk-rio.svg",
      imagenAlt: "Flyer del viaje Samba y Zouk a Río de Janeiro, del 2 al 9 de abril de 2027",
      enlace: "",
    },
  ],

  contacto: {
    whatsapp: "573000000000",
    instagram: "tuestudio",
    email: "hola@tuestudio.com",
    direccion: "Calle Ejemplo 123, Medellín, Antioquia",
  },
};
