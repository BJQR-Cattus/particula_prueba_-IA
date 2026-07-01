const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// --- 1. CONFIGURACIÓN DEL CONTORNO ORIGINAL ---
const particles = [];
const particleCount = 450;

function getHeartPoint(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    ),
  };
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.t = Math.random() * Math.PI * 2;
    const point = getHeartPoint(this.t);
    const scale = 12 + Math.random() * 3; // El contorno externo vive entre la escala 12 y 15

    this.x = canvas.width / 2 + point.x * scale;
    this.y = canvas.height / 2 + point.y * scale;

    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;

    this.life = Math.random() * 40 + 20;
    this.maxLife = this.life;
    this.size = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    if (this.life <= 0) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 30, 60, ${this.life / this.maxLife})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgb(255, 0, 50)";
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// --- 2. VARIABLES DE TRANSICIÓN ---
let globalAlpha = 0;
let globalScale = 0.1;
let currentStage = "zoom";

// --- 3. CONFIGURACIÓN DEL VÓRTICE CORREGIDO ---
const vortexParticles = [];

class VortexParticle {
  constructor() {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = 0;

    this.angularVelocity = (Math.random() - 0.5) * 0.4;
    this.radialVelocity = Math.random() * 1.5 + 0.5;

    // EL LÍMITE: Ninguna partícula del vórtice pasará de la escala 11.5 (el borde interior)
    this.maxRadius = 10 + Math.random() * 1.5;

    this.size = Math.random() * 2.5 + 0.5;
    this.life = Math.random() * 30 + 15;
    this.maxLife = this.life;
  }

  update() {
    this.angle += this.angularVelocity;

    // Expansión controlada: Si no ha llegado al borde, sigue creciendo
    if (this.radius < this.maxRadius) {
      this.radius += this.radialVelocity;
    }

    this.life--;

    const limitPoint = getHeartPoint(this.angle);

    // Aplicamos el radio directamente para escalar manteniendo la forma
    this.x = canvas.width / 2 + limitPoint.x * this.radius;
    this.y = canvas.height / 2 + limitPoint.y * this.radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 10, 20, ${this.life / this.maxLife})`;
    ctx.fill();
  }
}

// --- 4. BUCLE PRINCIPAL DE ANIMACIÓN ---
function animate() {
  // LIMPIEZA CON NEGRO ABSOLUTO
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // CONTROL DE ESTADOS
  if (currentStage === "zoom") {
    if (globalAlpha < 1) globalAlpha += 0.02;
    if (globalScale < 1) {
      globalScale += 0.015;
    } else {
      globalScale = 1;
      currentStage = "vortex";
    }
  }

  // RENDERIZADO DEL CONTORNO
  ctx.globalCompositeOperation = "lighter";
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(globalScale, globalScale);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  particles.forEach((particle) => {
    particle.update();
    ctx.save();
    ctx.globalAlpha = globalAlpha;
    particle.draw();
    ctx.restore();
  });
  ctx.restore();

  // RENDERIZADO DEL VÓRTICE (Contenido dentro del corazón)
  if (currentStage === "vortex") {
    ctx.globalCompositeOperation = "source-over";

    // Inyectamos partículas
    for (let i = 0; i < 10; i++) {
      vortexParticles.push(new VortexParticle());
    }

    // Actualizamos
    for (let i = vortexParticles.length - 1; i >= 0; i--) {
      const p = vortexParticles[i];
      p.update();
      p.draw();

      if (p.life <= 0) {
        vortexParticles.splice(i, 1);
      }
    }
  }

  requestAnimationFrame(animate);
}

// Iniciar
animate();
