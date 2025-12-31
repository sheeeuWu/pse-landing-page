const heroHeader = document.getElementById("heroHeader");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  heroHeader.style.transform = `translateY(${-scrollY}px)`;
});
