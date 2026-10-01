const eventDate = new Date("2026-12-12T20:00:00+01:00");

function updateCountdown(){
  const now = new Date();
  let diff = eventDate - now;
  if(diff < 0) diff = 0;
  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  document.querySelector("#days").textContent = String(days).padStart(2,"0");
  document.querySelector("#hours").textContent = String(hours).padStart(2,"0");
  document.querySelector("#minutes").textContent = String(minutes).padStart(2,"0");
  document.querySelector("#seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.animate(
    {left:`${e.clientX}px`, top:`${e.clientY}px`},
    {duration:450, fill:"forwards"}
  );
});

const modal = document.querySelector("#modal");
const title = document.querySelector("#modalTitle");
const text = document.querySelector("#modalText");
const eyebrow = document.querySelector("#modalEyebrow");

const modalData = {
  pitcher: {
    eyebrow:"IK WIL PITCHEN",
    title:"VERKOOP JE BESTE VRIEND.",
    text:"Ken jij iemand die single is en eigenlijk door iedereen gekend moet worden? Dan is dit jouw moment. De exacte inschrijvingslink voor pitchers kan hier toegevoegd worden."
  },
  single: {
    eyebrow:"IK BEN SINGLE",
    title:"MISSCHIEN BEN JIJ DE MATCH.",
    text:"Kom als single, leer andere mensen kennen en laat je verrassen. De ticketlink kan hier toegevoegd worden zodra die beschikbaar is."
  },
  watch: {
    eyebrow:"IK KOM KIJKEN",
    title:"KOM SUPPORTEREN.",
    text:"Je hoeft niemand te pitchen om erbij te zijn. Kom kijken, lachen, supporteren en wie weet zelf iemand tegenkomen."
  }
};

document.querySelectorAll("[data-modal]").forEach(card => {
  card.addEventListener("click", () => {
    const data = modalData[card.dataset.modal];
    eyebrow.textContent = data.eyebrow;
    title.textContent = data.title;
    text.textContent = data.text;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
    document.body.classList.add("modal-open");
  });
});

document.querySelectorAll("[data-close]").forEach(el => {
  el.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");
    document.body.classList.remove("modal-open");
  });
});

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
});

// Small tilt interaction on desktop cards.
if (window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".choice-card,.hero-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      if(card.classList.contains("hero-card")){
        card.style.transform = `perspective(800px) rotateX(${y*-4}deg) rotateY(${x*5}deg) rotateZ(3deg)`;
      } else {
        card.style.transform = `perspective(800px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-6px)`;
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = card.classList.contains("hero-card") ? "rotate(4deg)" : "";
    });
  });
}
