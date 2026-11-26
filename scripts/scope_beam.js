// Scope projector beam

(function() {
  const canvas = document.getElementById("scopeBeam");
  const hunter = document.getElementById("bountyHunter");
  const hologram = document.getElementById("hologram");
  const ctx = canvas.getContext("2d");

  // Where the scope's front lens sits within the character image. Below desktop, the image is the
  // character with the rifle resting on his shoulder, so the lens is somewhere else in it.
  const LENS = { x: 0.555, y: 0.6255 };
  const RESTING_LENS = { x: 0.3678, y: 0.109 };

  // Where the hologram's corner brackets sit within the hologram image.
  const FRAME = { left: 0.026, top: 0.193, right: 0.974, bottom: 0.8 };

  // Drawing at a reduced resolution softens the light, and is cheaper.
  const SCALE = 0.5;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function random(seed) {
    const x = Math.sin(seed * 127.1) * 43758.5453;
    return x - Math.floor(x);
  }

  const rays = Array.from({ length: 26 }, (_, i) => ({
    position: (i + random(i + 1)) / 26,
    width: 0.012 + 0.05 * random(i + 50),
    strength: 0.25 + 0.75 * random(i + 100),
    speed: 0.3 + 0.9 * random(i + 150),
  }));

  const motes = Array.from({ length: 70 }, (_, i) => ({
    distance: random(i + 200),
    position: random(i + 300),
    size: 0.35 + 0.6 * random(i + 400),
    speed: 0.004 + 0.012 * random(i + 500),
    phase: 6.28 * random(i + 600),
  }));

  // Brightness of the projector's lamp, which flickers lightly, and stutters every few seconds.
  function lampBrightness(time) {
    const hum = 0.95 + 0.03 * Math.sin(time * 7.3) + 0.02 * Math.sin(time * 23.1);
    const step = Math.floor(time * 18);
    const grain = 0.05 * random(step);

    const cycle = Math.floor(time / 3.1);
    const sinceStutter = time - cycle * 3.1 - 2.2 * random(cycle + 700);
    const isStuttering = sinceStutter > 0 && sinceStutter < 0.28;
    const stutter = isStuttering ? 0.2 * random(step + 900) : 0;

    return hum - grain - stutter;
  }

  function draw(time) {
    const flicker = reducedMotion.matches ? 0.95 : lampBrightness(time);
    hologram.style.opacity = flicker;

    const bounds = canvas.getBoundingClientRect();
    const width = Math.round(bounds.width * SCALE);
    const height = Math.round(bounds.height * SCALE);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    ctx.clearRect(0, 0, bounds.width, bounds.height);
    ctx.globalCompositeOperation = "lighter";

    const h = hunter.getBoundingClientRect();
    const at = hunter.currentSrc.includes("resting") ? RESTING_LENS : LENS;
    const lens = { x: h.left - bounds.left + h.width * at.x, y: h.top - bounds.top + h.height * at.y };

    const p = hologram.getBoundingClientRect();
    if (h.width === 0 || p.width === 0) {
      return;
    }
    const left = p.left - bounds.left + p.width * FRAME.left;
    const right = p.left - bounds.left + p.width * FRAME.right;
    const top = p.top - bounds.top + p.height * FRAME.top;
    const bottom = p.top - bounds.top + p.height * FRAME.bottom;

    // The beam spans the widest angle that the hologram's frame covers, as seen from the lens.
    const corners = [[left, top], [right, top], [right, bottom], [left, bottom]].map(([x, y]) => ({
      x, y, angle: Math.atan2(y - lens.y, x - lens.x), distance: Math.hypot(x - lens.x, y - lens.y),
    })).sort((a, b) => a.angle - b.angle);
    const first = corners[0];
    const last = corners[3];
    const reach = Math.max(...corners.map((c) => c.distance));
    const near = Math.min(...corners.map((c) => c.distance)) / reach;

    const light = (alpha) => {
      const g = ctx.createRadialGradient(lens.x, lens.y, 0, lens.x, lens.y, reach);
      g.addColorStop(0, `rgba(150, 225, 255, ${alpha})`);
      g.addColorStop(near * 0.25, `rgba(70, 180, 255, ${alpha * 0.55})`);
      g.addColorStop(near, `rgba(40, 150, 255, ${alpha * 0.26})`);
      g.addColorStop(1, `rgba(30, 130, 255, ${alpha * 0.07})`);
      return g;
    };

    // Everything in the beam stays within the silhouette from the lens around the hologram's frame.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lens.x, lens.y);
    ctx.lineTo(first.x, first.y);
    [[left, top], [right, top], [right, bottom], [left, bottom]]
      .map(([x, y]) => ({ x, y, a: Math.atan2(y - lens.y, x - lens.x), d: Math.hypot(x - lens.x, y - lens.y) }))
      .filter((c) => c.a > first.angle && c.a < last.angle && c.d > Math.min(first.distance, last.distance))
      .sort((a, b) => a.a - b.a)
      .slice(0, 1)
      .forEach((c) => ctx.lineTo(c.x, c.y));
    ctx.lineTo(last.x, last.y);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = light(0.42 * flicker);
    ctx.fillRect(0, 0, bounds.width, bounds.height);

    const spread = last.angle - first.angle;
    rays.forEach((ray, i) => {
      const angle = first.angle + spread * (ray.position + 0.012 * Math.sin(time * ray.speed + i));
      const half = spread * ray.width / 2;
      ctx.fillStyle = light(0.30 * ray.strength * flicker * (0.75 + 0.25 * Math.sin(time * ray.speed * 2 + i * 1.7)));
      ctx.beginPath();
      ctx.moveTo(lens.x, lens.y);
      ctx.lineTo(lens.x + Math.cos(angle - half) * reach, lens.y + Math.sin(angle - half) * reach);
      ctx.lineTo(lens.x + Math.cos(angle + half) * reach, lens.y + Math.sin(angle + half) * reach);
      ctx.fill();
    });

    motes.forEach((mote) => {
      const d = ((mote.distance + time * mote.speed) % 1) * reach * 0.9;
      const a = first.angle + spread * (mote.position + 0.02 * Math.sin(time * 0.4 + mote.phase));
      const alpha = 0.5 * (0.5 + 0.5 * Math.sin(time * 1.3 + mote.phase)) * (1 - d / reach);
      ctx.fillStyle = `rgba(190, 235, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(lens.x + Math.cos(a) * d, lens.y + Math.sin(a) * d, mote.size + 0.6, 0, 6.2832);
      ctx.fill();
    });
    ctx.restore();

    // The lit lens, and the light it spills across the rifle.
    const glow = (radius, stops) => {
      const g = ctx.createRadialGradient(lens.x, lens.y, 0, lens.x, lens.y, radius);
      stops.forEach(([at, color]) => g.addColorStop(at, color));
      ctx.fillStyle = g;
      ctx.fillRect(lens.x - radius, lens.y - radius, radius * 2, radius * 2);
    };
    const size = h.width / (at === RESTING_LENS ? 360 : 500);
    glow(90 * size, [[0, `rgba(50, 160, 255, ${0.55 * flicker})`], [0.35, `rgba(35, 130, 255, ${0.16 * flicker})`], [1, "rgba(20, 100, 255, 0)"]]);
    glow(15 * size, [[0, "rgba(255, 255, 255, 1)"], [0.3, "rgba(190, 240, 255, 0.95)"], [0.6, "rgba(60, 180, 255, 0.45)"], [1, "rgba(40, 150, 255, 0)"]]);
  }

  let isVisible = true;
  let frame = null;

  function tick(now) {
    frame = null;
    draw(now / 1000);
    if (isVisible && !reducedMotion.matches) {
      frame = requestAnimationFrame(tick);
    }
  }

  function schedule() {
    if (frame === null) {
      frame = requestAnimationFrame(tick);
    }
  }

  new IntersectionObserver((entries) => {
    isVisible = entries[entries.length - 1].isIntersecting;
    schedule();
  }).observe(canvas);
  reducedMotion.addEventListener("change", schedule);
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  schedule();
})();
