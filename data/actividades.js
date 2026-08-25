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
  }
  // próxima actividad del mes: agregar un nuevo objeto acá
];
