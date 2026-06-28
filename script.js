/* ===========================================================
   IRRITATION — script.js
   Rain canvas + fireflies + floating hearts + music control
   =========================================================== */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     RAIN CANVAS
  --------------------------------------------------------- */
  function initRain() {
    const canvas = document.getElementById("rain-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height, drops;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.floor((width * height) / 9000);
      drops = new Array(count).fill(null).map(createDrop);
    }

    function createDrop() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        len: 10 + Math.random() * 20,
        speed: 4 + Math.random() * 6,
        opacity: 0.1 + Math.random() * 0.25,
        drift: -0.5 + Math.random() * 1
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(180, 195, 220, 1)";
      ctx.lineWidth = 1;

      for (const d of drops) {
        ctx.globalAlpha = d.opacity;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.drift * 2, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x += d.drift;

        if (d.y > height) {
          d.y = -d.len;
          d.x = Math.random() * width;
        }
      }
      ctx.globalAlpha = 1;

      if (!reduceMotion) requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    if (!reduceMotion) {
      requestAnimationFrame(draw);
    } else {
      // Draw a single static-ish frame for reduced motion users
      draw();
    }
  }

  /* ---------------------------------------------------------
     FIREFLIES
  --------------------------------------------------------- */
  function initFireflies() {
    const container = document.getElementById("fireflies");
    if (!container) return;
    if (reduceMotion) return; // skip ambient motion entirely

    const count = window.innerWidth < 600 ? 12 : 22;

    for (let i = 0; i < count; i++) {
      const fly = document.createElement("div");
      fly.className = "firefly";
      const x = Math.random() * 100;
      const y = 40 + Math.random() * 55; // lower 2/3 of screen
      const floatDur = 6 + Math.random() * 8;
      const glowDur = 3 + Math.random() * 4;
      const delay = Math.random() * 8;

      fly.style.left = x + "vw";
      fly.style.top = y + "vh";
      fly.style.animationDuration = `${floatDur}s, ${glowDur}s`;
      fly.style.animationDelay = `${delay}s, ${delay}s`;

      container.appendChild(fly);
    }
  }

  /* ---------------------------------------------------------
     FLOATING HEARTS
  --------------------------------------------------------- */
  function initHearts() {
    const container = document.getElementById("hearts");
    if (!container) return;
    if (reduceMotion) return;

    const symbols = ["❤", "❤︎", "♥"];
    const count = window.innerWidth < 600 ? 9 : 15;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      const x = Math.random() * 100;
      const size = 0.7 + Math.random() * 1.1;
      const dur = 10 + Math.random() * 12;
      const delay = Math.random() * 14;

      heart.style.left = x + "vw";
      heart.style.fontSize = size + "rem";
      heart.style.animationDuration = dur + "s";
      heart.style.animationDelay = delay + "s";

      container.appendChild(heart);
    }
  }

  /* ---------------------------------------------------------
     MUSIC TOGGLE (autoplay attempt + amplifier visual)
  --------------------------------------------------------- */
  function initMusic() {
    const audio = document.getElementById("bg-music");
    const btn = document.getElementById("music-toggle");
    if (!audio || !btn) return;

    audio.volume = 0.5;

    function setPlayingUI(isPlaying) {
      btn.classList.toggle("playing", isPlaying);
      btn.setAttribute("aria-pressed", String(isPlaying));
    }

    function tryPlay() {
      const attempt = audio.play();
      if (attempt && typeof attempt.then === "function") {
        attempt
          .then(() => setPlayingUI(true))
          .catch(() => setPlayingUI(false));
      }
    }

    // Try genuine (unmuted) autoplay first
    tryPlay();

    // If the browser blocked it, start on the very first user interaction
    function unlockOnFirstInteraction() {
      if (audio.paused) tryPlay();
      document.removeEventListener("click", unlockOnFirstInteraction);
      document.removeEventListener("touchstart", unlockOnFirstInteraction);
      document.removeEventListener("keydown", unlockOnFirstInteraction);
    }
    document.addEventListener("click", unlockOnFirstInteraction, { once: true });
    document.addEventListener("touchstart", unlockOnFirstInteraction, { once: true });
    document.addEventListener("keydown", unlockOnFirstInteraction, { once: true });

    // Manual control — user's choice always wins
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (audio.paused) {
        tryPlay();
      } else {
        audio.pause();
        setPlayingUI(false);
      }
    });

    audio.addEventListener("pause", () => setPlayingUI(false));
    audio.addEventListener("play", () => setPlayingUI(true));
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initRain();
    initFireflies();
    initHearts();
    initMusic();
  });
})();
