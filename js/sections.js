// SCHOOL CARD SECTION

const track = document.querySelector(".school-card-track");
const cards = document.querySelectorAll(".school-card");
const dotsContainer = document.querySelector(".slider-dots");

cards.forEach((_, i) => {
  const dot = document.createElement("button");

  dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    track.scrollTo({
      left: track.clientWidth * i,
      behavior: "smooth",
    });
  });
});

const dots = dotsContainer.querySelectorAll("button");

track.addEventListener("scroll", () => {
  const index = Math.round(track.scrollLeft / track.clientWidth);
  dots.forEach((d) => d.classList.remove("active"));
  dots[index]?.classList.add("active");
});

//EXHIBITION

const slider = document.getElementById("cardSlider");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const GAP = 24;
const exhibitionCards = Array.from(slider.children);
const CARD_WIDTH = exhibitionCards[0].offsetWidth + GAP;
const AUTO_DELAY = 3000;

let autoSlide;

exhibitionCards.forEach((card) => {
  slider.appendChild(card.cloneNode(true));
});

slider.scrollLeft = CARD_WIDTH * exhibitionCards.length;

function startAutoSlide() {
  autoSlide = setInterval(() => {
    slider.scrollLeft += CARD_WIDTH;
    checkLoop();
  }, AUTO_DELAY);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function checkLoop() {
  const maxScroll = CARD_WIDTH * exhibitionCards.length * 2;

  if (slider.scrollLeft >= maxScroll - CARD_WIDTH) {
    slider.scrollLeft = CARD_WIDTH * exhibitionCards.length;
  }

  if (slider.scrollLeft <= 0) {
    slider.scrollLeft = CARD_WIDTH * exhibitionCards.length;
  }
}

rightArrow.addEventListener("click", () => {
  stopAutoSlide();
  slider.scrollLeft += CARD_WIDTH;
  checkLoop();
  startAutoSlide();
});

leftArrow.addEventListener("click", () => {
  stopAutoSlide();
  slider.scrollLeft -= CARD_WIDTH;
  checkLoop();
  startAutoSlide();
});

slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

startAutoSlide();

document.querySelectorAll(".hover-arrow").forEach((arrow) => {
  const defaultSrc = arrow.src;
  const hoverSrc = arrow.dataset.hover;
  const defaultTransform = getComputedStyle(arrow).transform;

  arrow.addEventListener("mouseenter", () => {
    arrow.src = hoverSrc;

    if (arrow.classList.contains("left-arrow")) {
      arrow.style.transform = "rotate(180deg)";
    }
    if (arrow.classList.contains("right-arrow")) {
      arrow.style.transform = "rotate(360deg)";
    }
  });

  arrow.addEventListener("mouseleave", () => {
    arrow.src = defaultSrc;
    arrow.style.transform = defaultTransform;
  });
});
