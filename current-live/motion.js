const stage = document.querySelector('.stage');
const logo = document.querySelector('.logo-tilt');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
let bounds;
let frame = 0;
let x = 0;
let y = 0;
function reset() {
  cancelAnimationFrame(frame);
  frame = 0;
  logo.style.transform = '';
  stage.classList.remove('active');
}
stage.addEventListener('pointerenter', () => {
  if (reduce.matches || !fine.matches) return;
  bounds = stage.getBoundingClientRect();
  stage.classList.add('active');
});
stage.addEventListener('pointermove', event => {
  if (reduce.matches || !fine.matches || !bounds) return;
  x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  if (frame) return;
  frame = requestAnimationFrame(() => {
    logo.style.transform = `rotateX(${-y * 13}deg) rotateY(${x * 16}deg) translateZ(18px)`;
    frame = 0;
  });
});
stage.addEventListener('pointerleave', reset);
reduce.addEventListener('change', reset);
window.addEventListener('blur', reset);
