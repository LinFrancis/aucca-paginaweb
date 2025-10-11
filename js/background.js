// Fondo aleatorio de huerta para páginas con body.has-random-bg
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('has-random-bg')) return;

  const images = [
    'cultivo_alcachofa.jpeg',
    'vista_desde_espino.jpeg',
    'tomates.jpeg',
    'biofiltro.jpeg',
    'arte_bioconstruccion.jpeg'
  ];

  const pick = images[Math.floor(Math.random() * images.length)];
  document.body.style.backgroundImage = `url('images/${pick}')`;
});
