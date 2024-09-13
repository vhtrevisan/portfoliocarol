// Carrossel automático
let index = 0;
const items = document.querySelectorAll('.carousel-item');

function showNextProject() {
  index = (index + 1) % items.length;
  items.forEach(item => item.style.transform = `translateX(-${index * 100}%)`);
}

setInterval(showNextProject, 3000);
