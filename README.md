# Animación de Corazón con HTML5 Canvas ❤️

Este proyecto es una animación dinámica e interactiva de un corazón latiendo, construida completamente desde cero utilizando **HTML5 Canvas** y **JavaScript puro**. No requiere librerías externas ni motores gráficos pesados.

## 🚀 Características

La animación se divide en distintas fases visuales fluidas:
* **Efecto de Entrada (Fade-in & Zoom):** El corazón aparece suavemente desde la oscuridad escalando desde el centro de la pantalla.
* **Contorno de Partículas Neón:** Generación matemática de la silueta del corazón utilizando coordenadas paramétricas, con partículas que simulan un brillo de neón intenso.
* **Tormenta de Vórtice Invertido (Vortex Infill):** Una vez formado el contorno, cientos de partículas rojas giran rápidamente desde el centro hacia afuera, adaptándose a la geometría interna del corazón sin desbordar sus límites.
* **Fondo Limpio y Optimizado:** Gestión avanzada de los modos de fusión (`globalCompositeOperation`) para mantener un fondo negro absoluto y un excelente rendimiento de fotogramas.

## 🛠️ Tecnologías Utilizadas

* **HTML5** (Canvas API)
* **CSS3** (Estilos básicos y reset)
* **JavaScript** (Lógica de partículas, física matemática y `requestAnimationFrame`)

## 📁 Estructura del Proyecto

El proyecto consta de tres archivos fundamentales:

```text
📁 corazon/
├── 📄 index.html    # Estructura del documento y el lienzo (canvas)
├── 📄 style.css     # Estilos para el fondo oscuro y pantalla completa
├── 📄 script.js     # Motor de la animación y física de partículas
└── 📄 README.md     # Documentación del proyecto