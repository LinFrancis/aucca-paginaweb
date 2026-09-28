// Actividades de autogestión mensual de Aucca.
// Para agregar la actividad de un nuevo mes: crear actividades/AAAA-MM-slug/
// con afiche + programa (+ header_formulario si aplica) y agregar un objeto acá.
const ACTIVIDADES = [
  {
    id: "2026-09-cultiva-tu-alimento",
    titulo: "Cultiva tu Alimento",
    subtitulo: "Jornada Intensiva de Aprendizaje en Sustentabilidad y Regeneración",
    fecha: "2026-09-06",
    fechaTexto: "Domingo 6 de septiembre · 10:30 a 18:00 hrs",
    resumen: [
      "Visita guiada por 1.500 m² de tecnologías regenerativas (13 paradas)",
      "Almuerzo: empanada vegetal + bebestible",
      "Taller práctico: siembras tu propio almácigo y te lo llevas",
      "Cierre con círculo de palabras y música al atardecer"
    ],
    valores: "Día completo $13.000 · Medio día (solo AM o solo PM) $7.000",
    carpeta: "actividades/2026-09-cultiva-tu-alimento/",
    imagen: "actividades/2026-09-cultiva-tu-alimento/afiche.jpeg",
    imagenAncho: 775,
    imagenAlto: 1078,
    headerFormulario: "actividades/2026-09-cultiva-tu-alimento/header_formulario.png",
    programaPdf: "actividades/2026-09-cultiva-tu-alimento/programa.pdf",
    instagramPermalink: "https://www.instagram.com/reel/Dccmd_0RM_3/",
    inscripcion: "https://forms.gle/efVDFuQeasnA3sNa7"
  },
  {
    id: "2026-10-talleres-en-familia",
    titulo: "Talleres en Familia",
    subtitulo: "Método Biointensivo para adultos + Alfarería y Hotel de Insectos para niños y niñas",
    fecha: "2026-10-04",
    fechaTexto: "Domingo 4 de octubre · 10:00 a 14:00 hrs",
    resumen: [
      "Adultos: taller de método biointensivo y diseño de huerta de primavera-verano",
      "Niños y niñas: alfarería precolombina y construcción de hoteles de insectos",
      "Kit de huerta para participantes del taller de adultos",
      "Cierre compartiendo empanadas vegetales y jugo"
    ],
    valores: "Adultos $13.000 · Niños/as $10.000",
    carpeta: "actividades/2026-10-talleres-en-familia/",
    imagen: "actividades/2026-10-talleres-en-familia/afiche.jpg",
    imagenAncho: 361,
    imagenAlto: 640,
    instagramPermalink: "https://www.instagram.com/p/DdrRkTlRVPS/",
    inscripcion: "https://forms.gle/jZAjbD31pRyGDdyL7"
  }
  // próxima actividad del mes: agregar un nuevo objeto acá
];
