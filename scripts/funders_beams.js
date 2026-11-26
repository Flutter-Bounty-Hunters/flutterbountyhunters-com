// Beams from the bounty hunter's neck lights, which project the funders' logos

(function() {
  const section = document.getElementById("OurFunders");
  const hunter = document.getElementById("fundersHunter");
  const funders = Array.from(section.querySelectorAll(".funder"));

  // Most of the light passes behind the hunter, and some passes in front.
  const back = document.getElementById("fundersBeams");
  const front = document.getElementById("fundersBeamsInFront");
  const ctx = back.getContext("2d");
  const frontCtx = front.getContext("2d");
  const FRONT_LIGHT = 0.4;

  // Drawing at a reduced resolution softens the light, and is cheaper.
  const SCALE = 0.5;

  // Where the neck lights sit within the hunter image.
  const LAMPS = [{ x: 0.4175, y: 0.3889 }, { x: 0.5831, y: 0.3889 }];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function random(seed) {
    const x = Math.sin(seed * 127.1) * 43758.5453;
    return x - Math.floor(x);
  }

  // Eases from 0 to 1 as x goes from start to end.
  function smoothstep(start, end, x) {
    const t = Math.min(1, Math.max(0, (x - start) / (end - start)));
    return t * t * (3 - 2 * t);
  }

  function bell(x) {
    return Math.exp(-x * x);
  }

  // Each lamp's light is first drawn here, by itself, and then added to the scene.
  const lampLight = document.createElement("canvas");
  const lampCtx = lampLight.getContext("2d");

  // The light's color, and how it dies out over its reach. It eases to nothing, so that there's no visible end.
  const LIGHT = [
    [0, "190, 238, 255", 1],
    [0.1, "115, 208, 255", 0.68],
    [0.22, "75, 180, 255", 0.5],
    [0.36, "55, 165, 255", 0.38],
    [0.5, "45, 155, 255", 0.27],
    [0.62, "42, 152, 255", 0.175],
    [0.74, "40, 150, 255", 0.095],
    [0.85, "40, 150, 255", 0.038],
    [0.94, "40, 150, 255", 0.009],
    [1, "40, 150, 255", 0],
  ];

  // Draws the light from a lamp, where the given brightness varies by angle, and fades over the given reach.
  function drawLight({ lamp, from, to, reach, brightness, width, height }) {
    const steps = 240;
    const byAngle = lampCtx.createConicGradient(from, lamp.x, lamp.y);
    for (let i = 0; i <= steps; i += 1) {
      const angle = from + (to - from) * i / steps;
      byAngle.addColorStop((angle - from) / (2 * Math.PI), `rgba(255, 255, 255, ${Math.min(1, brightness(angle))})`);
    }
    byAngle.addColorStop(1, "rgba(255, 255, 255, 0)");

    const byDistance = lampCtx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, reach);
    LIGHT.forEach(([at, color, alpha]) => byDistance.addColorStop(at, `rgba(${color}, ${alpha})`));

    lampCtx.globalCompositeOperation = "copy";
    lampCtx.fillStyle = byAngle;
    lampCtx.fillRect(0, 0, width, height);
    lampCtx.globalCompositeOperation = "source-in";
    lampCtx.fillStyle = byDistance;
    lampCtx.fillRect(0, 0, width, height);

    ctx.drawImage(lampLight, 0, 0, width, height);
  }

  function draw(time) {
    const bounds = back.getBoundingClientRect();
    const h = hunter.getBoundingClientRect();
    const width = Math.round(bounds.width);
    const height = Math.round(bounds.height);
    if (width === 0 || height === 0 || h.width === 0) {
      return;
    }
    const pixelWidth = Math.round(width * SCALE);
    const pixelHeight = Math.round(height * SCALE);
    [back, front, lampLight].forEach((canvas) => {
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      canvas.getContext("2d").setTransform(SCALE, 0, 0, SCALE, 0, 0);
    });

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    const flicker = reducedMotion.matches ? 0.95 : 0.95 + 0.03 * Math.sin(time * 7.3) + 0.02 * Math.sin(time * 23);
    const lamps = LAMPS.map((lamp) => ({ x: h.left - bounds.left + h.width * lamp.x, y: h.top - bounds.top + h.height * lamp.y }));
    const dustSize = Math.min(1, Math.max(0.5, h.width / 823));
    const middle = (lamps[0].x + lamps[1].x) / 2;

    const logos = funders.map((funder) => {
      const rect = funder.querySelector(".funder-logo").getBoundingClientRect();
      return {
        x: rect.left - bounds.left + rect.width / 2,
        y: rect.top - bounds.top + rect.height / 2,
        radius: rect.height * 0.67,
        isPointedAt: funder.matches(":hover, :focus-visible"),
      };
    });

    lamps.forEach((lamp, side) => {
      // Each light projects the logos on its own side. Both lights project a logo in the middle.
      const direction = side === 0 ? -1 : 1;
      const targets = logos
        .map((logo) => ({ ...logo, offset: (logo.x - middle) * direction }))
        .filter((logo) => logo.offset > -logo.radius / 2)
        .map((logo) => ({
          ...logo,
          isShared: logo.offset < logo.radius / 2,
          angle: Math.atan2(logo.y - lamp.y, logo.x - lamp.x),
          distance: Math.hypot(logo.x - lamp.x, logo.y - lamp.y),
        }));
      if (targets.length === 0) {
        return;
      }

      // The light fades out gradually to either side of the logos, most of all toward the outside.
      const first = Math.min(...targets.map((logo) => logo.angle));
      const last = Math.max(...targets.map((logo) => logo.angle));
      const outside = 0.55;
      const inside = 0.16;
      const from = first - (side === 0 ? outside : inside);
      const to = last + (side === 0 ? inside : outside);
      const edges = (angle) => smoothstep(from, first + 0.04, angle) * (1 - smoothstep(last - 0.04, to, angle));

      const rays = Array.from({ length: 34 }, (_, i) => {
        const seed = i + 1 + side * 60;
        const sway = 0.008 * Math.sin(time * (0.3 + random(i)) + i);
        return {
          angle: from + (to - from) * ((i + random(seed)) / 34 + sway),
          width: 0.006 + 0.016 * random(seed + 50),
          strength: 0.06 + 0.24 * random(seed + 90),
        };
      });

      const brightness = (angle) => {
        const beams = targets.reduce((sum, logo) => {
          const half = Math.asin(Math.min(1, logo.radius / logo.distance));
          const strength = logo.isShared ? 0.315 : 0.42;
          return sum + strength * bell((angle - logo.angle) / (half * 0.85));
        }, 0);
        const streaks = rays.reduce((sum, ray) => sum + ray.strength * bell((angle - ray.angle) / ray.width), 0);
        return (edges(angle) * (0.56 + streaks) + smoothstep(0, 1, edges(angle) * 2) * beams) * flicker;
      };

      const reach = Math.max(...targets.map((logo) => logo.distance)) * 1.55;
      drawLight({ lamp, from, to, reach, brightness, width, height });

      // Dust that drifts through the light.
      ctx.fillStyle = "rgb(205, 242, 255)";
      for (let i = 0; i < 70; i += 1) {
        const seed = i + side * 60;
        const distance = (random(seed + 200) + time * (0.004 + 0.012 * random(i + 500))) % 1;
        const angle = from + (to - from) * random(seed + 300);
        const twinkle = 0.5 + 0.5 * Math.sin(time + 6 * random(i));
        ctx.globalAlpha = 0.6 * (1 - distance) * (1 - distance) * edges(angle) * twinkle;
        ctx.beginPath();
        ctx.arc(lamp.x + reach * distance * Math.cos(angle), lamp.y + reach * distance * Math.sin(angle), dustSize * (1.1 + random(i + 400) * 1.2), 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    });

    // Both lights turn up their beams on a logo that's pointed at.
    logos.filter((logo) => logo.isPointedAt).forEach((logo) => lamps.forEach((lamp) => {
      const angle = Math.atan2(logo.y - lamp.y, logo.x - lamp.x);
      const distance = Math.hypot(logo.x - lamp.x, logo.y - lamp.y);
      const half = Math.asin(Math.min(1, logo.radius / distance)) * 0.85;
      drawLight({
        lamp,
        from: angle - half * 3,
        to: angle + half * 3,
        reach: distance * 1.7,
        brightness: (a) => 0.4 * bell((a - angle) / half) * flicker,
        width,
        height,
      });
    }));

    frontCtx.clearRect(0, 0, width, height);
    frontCtx.globalCompositeOperation = "lighter";
    frontCtx.globalAlpha = FRONT_LIGHT;
    frontCtx.drawImage(back, 0, 0, width, height);
    frontCtx.globalAlpha = 1;

    // The lit lamps.
    const radius = h.width * 0.141;
    lamps.forEach((lamp) => {
      const glow = frontCtx.createRadialGradient(lamp.x, lamp.y, 0, lamp.x, lamp.y, radius);
      glow.addColorStop(0, `rgba(255, 255, 255, ${flicker})`);
      glow.addColorStop(0.1, `rgba(190, 240, 255, ${0.9 * flicker})`);
      glow.addColorStop(0.26, `rgba(60, 165, 255, ${0.4 * flicker})`);
      glow.addColorStop(1, "rgba(40, 150, 255, 0)");
      frontCtx.fillStyle = glow;
      frontCtx.fillRect(lamp.x - radius, lamp.y - radius, radius * 2, radius * 2);
    });
  }

  let isVisible = false;
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
  }).observe(section);
  funders.forEach((funder) => ["pointerenter", "pointerleave", "focus", "blur"].forEach((type) => funder.addEventListener(type, schedule)));
  reducedMotion.addEventListener("change", schedule);
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
})();
