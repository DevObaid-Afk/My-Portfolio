const cursor = document.getElementById("cursor");
const trail = document.getElementById("cursor-trail");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + "px";
  cursor.style.top = my - 6 + "px";
});

function updateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx - 15 + "px";
  trail.style.top = ty - 15 + "px";
  requestAnimationFrame(updateTrail);
}
updateTrail();

document.querySelectorAll("a, button, input, textarea").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
    trail.style.transform = "scale(1.5)";
    trail.style.borderColor = "rgba(255,0,110,0.6)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    trail.style.transform = "scale(1)";
    trail.style.borderColor = "rgba(0,245,255,0.4)";
  });
});

// PARTICLES
const particlesContainer = document.getElementById("particles");
function createParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  const colors = ["#00f5ff", "#ff006e", "#a855f7"];
  p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: 0;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      animation-duration: ${4 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 6}s;
    `;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 14000);
}
for (let i = 0; i < 40; i++) setTimeout(() => createParticle(), i * 200);
setInterval(createParticle, 300);

// COUNTERS
function animateCounters() {
  document.querySelectorAll("[data-target]").forEach((el) => {
    const target = parseInt(el.dataset.target);
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target) + (progress === 1 ? "+" : "");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// SCROLL REVEAL
const skillFills = new Set();
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".skill-fill").forEach((bar) => {
          if (!skillFills.has(bar)) {
            skillFills.add(bar);
            setTimeout(() => {
              bar.style.width = bar.dataset.width + "%";
            }, 300);
          }
        });
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.querySelectorAll(".skill-fill").forEach((bar) => {
  bar.style.width = "0%";
});

let countersStarted = false;
const heroObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      setTimeout(animateCounters, 500);
    }
  },
  { threshold: 0.5 },
);
heroObserver.observe(document.getElementById("hero"));

// PARALLAX
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const h3d = document.querySelector(".hero-3d");
  if (h3d)
    h3d.style.transform = `translateY(-50%) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`;
});

// NAVBAR ACTIVE
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute("id");
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--neon-cyan)" : "";
  });
});
// FORM
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.textContent = "TRANSMITTING...";
  btn.style.opacity = "0.6";
  setTimeout(() => {
    btn.textContent = "MESSAGE SENT ✓";
    btn.style.borderColor = "#00ff88";
    btn.style.color = "#00ff88";
    btn.style.opacity = "1";
    setTimeout(() => {
      btn.textContent = "SEND MESSAGE";
      btn.style.borderColor = "";
      btn.style.color = "";
      e.target.reset();
    }, 3000);
  }, 1500);
}

// GLITCH
const title = document.querySelector(".hero-title");
setInterval(() => {
  title.style.textShadow = `${Math.random() * 4 - 2}px 0 var(--neon-pink), ${Math.random() * -4 + 2}px 0 var(--neon-cyan)`;
  setTimeout(() => (title.style.textShadow = ""), 80);
}, 3000);
