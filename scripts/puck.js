// The puck that people can drag, throw and open

(() => {
  // These springs match the ones in the puck package.
  const dockSpring = [220, 26], itemSpring = [240, 24], pressSpring = [500, 22];

  const section = document.querySelector('.puck');
  const stage = section.querySelector('.puck-stage');
  const walls = stage.querySelector('.puck-walls');
  const root = stage.querySelector('.puck-root');
  const level = stage.querySelector('.puck-level');
  const items = [...stage.querySelectorAll('.puck-item')].map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0 }));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

  // Lengths are in units of the section's layout. Positions are from the left of the area that the puck moves in, and its vertical center.
  const layout = {};
  const puck = { x: 0, y: 0, vx: 0, vy: 0, scale: 1, vs: 0, pressed: false };
  let side = 'right', open = true, drag = null, frame = null, lastTime = 0, touched = false, switchTimer = null;

  function measure() {
    const style = getComputedStyle(section);
    for (const name of ['root', 'radius', 'step', 'dock']) layout[name] = parseFloat(style.getPropertyValue(`--${name}`));
    layout.unit = root.offsetWidth / layout.root;
    layout.width = walls.clientWidth / layout.unit;
    layout.height = walls.clientHeight / layout.unit;
    // The puck docks at the edges of the layout's column, which is narrower than a wide page.
    const frame = parseFloat(style.getPropertyValue('--frame'));
    if (frame) layout.dock += Math.max((layout.width - frame) / 2, 0);
  }

  const dockX = (s = side) => (s === 'right' ? layout.width - layout.dock : layout.dock);
  const nearestSide = () => (puck.x < layout.width / 2 ? 'left' : 'right');

  function itemTargets() {
    if (!open) return items.map(() => [puck.x, puck.y]);
    const x = drag ? puck.x : dockX();
    const y = drag ? puck.y : 0;
    const direction = (drag ? nearestSide() : side) === 'right' ? -1 : 1;
    return items.map((_, i) => {
      const angle = ((i - (items.length - 1) / 2) * layout.step * Math.PI) / 180;
      return [x + direction * layout.radius * Math.cos(angle), y + layout.radius * Math.sin(angle)];
    });
  }

  function spring(value, velocity, target, [stiffness, damping], dt) {
    velocity += (stiffness * (target - value) - damping * velocity) * dt;
    return [value + velocity * dt, velocity];
  }

  function step(dt) {
    [puck.scale, puck.vs] = spring(puck.scale, puck.vs, puck.pressed ? 1.04 : 1, pressSpring, dt);
    if (!drag) {
      [puck.x, puck.vx] = spring(puck.x, puck.vx, dockX(), dockSpring, dt);
      [puck.y, puck.vy] = spring(puck.y, puck.vy, 0, dockSpring, dt);
    }
    itemTargets().forEach(([x, y], i) => {
      const item = items[i];
      [item.x, item.vx] = spring(item.x, item.vx, x, itemSpring, dt);
      [item.y, item.vy] = spring(item.y, item.vy, y, itemSpring, dt);
    });
  }

  function settle() {
    if (!drag) {
      puck.x = dockX();
      puck.y = 0;
    }
    puck.vx = puck.vy = puck.vs = 0;
    puck.scale = 1;
    itemTargets().forEach(([x, y], i) => Object.assign(items[i], { x, y, vx: 0, vy: 0 }));
  }

  function isSettled() {
    const still = (value) => Math.abs(value) < 0.6;
    const targets = itemTargets();
    return !drag && still(puck.x - dockX()) && still(puck.y) && still(puck.vx) && still(puck.vy) && Math.abs(puck.vs) < 0.01
      && items.every((item, i) => still(item.vx) && still(item.vy) && still(item.x - targets[i][0]) && still(item.y - targets[i][1]));
  }

  function place(el, x, y, scale) {
    el.style.setProperty('--dx', (x - dockX('right')).toFixed(2));
    el.style.setProperty('--dy', y.toFixed(2));
    el.style.setProperty('--scale', scale.toFixed(4));
  }

  function paint() {
    place(root, puck.x, puck.y, puck.scale);
    let reach = 0;
    for (const { el, x, y } of items) {
      const distance = Math.hypot(x - puck.x, y - puck.y);
      reach += distance / items.length / layout.radius;
      place(el, x, y, Math.min(1, 0.3 + (0.7 * distance) / layout.radius));
      // An item that's beneath the puck can't be seen.
      el.style.visibility = open || distance > 6 ? 'visible' : 'hidden';
    }
    place(level, puck.x, puck.y, Math.max(reach, 0.01));
    level.style.opacity = Math.min(Math.max((reach - 0.5) * 2, 0), 1).toFixed(3);
  }

  function tick(time) {
    let elapsed = Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    if (reducedMotion.matches) settle();
    else for (; elapsed > 0; elapsed -= 1 / 240) step(Math.min(elapsed, 1 / 240));
    const settled = isSettled();
    if (settled) settle();
    paint();
    // The captions come back a little before everything is still.
    const calm = !drag && items.every((item) => Math.hypot(item.vx, item.vy) < 40) && Math.hypot(puck.vx, puck.vy) < 40;
    section.classList.toggle('puck-moving', !calm);
    frame = settled ? null : requestAnimationFrame(tick);
  }

  function animate() {
    if (frame !== null) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(tick);
  }

  function setOpen(value) {
    if (open === value) return;
    open = value;
    root.setAttribute('aria-expanded', open);
    section.classList.toggle('puck-closed', !open);
    if (open) items.forEach((item) => {
      if (item.el.style.visibility === 'hidden') Object.assign(item, { x: puck.x, y: puck.y, vx: 0, vy: 0 });
    });
    animate();
  }

  // The introduction, which is hidden during a drag, comes back on the side that the puck isn't on.
  function setSide(value) {
    side = value;
    clearTimeout(switchTimer);
    if (section.dataset.side === value) return section.classList.remove('puck-switching');
    section.classList.add('puck-switching');
    switchTimer = setTimeout(() => {
      section.dataset.side = value;
      section.classList.remove('puck-switching');
    }, 220);
  }

  root.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    touched = true;
    root.setPointerCapture(e.pointerId);
    puck.pressed = true;
    drag = { startX: e.clientX, startY: e.clientY, x: puck.x, y: puck.y, moved: false, trail: [] };
    animate();
  });

  root.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    drag.moved = true;
    const spare = Math.max(layout.height - layout.root, 0) / 2;
    puck.x = Math.min(Math.max(drag.x + dx / layout.unit, layout.dock), layout.width - layout.dock);
    puck.y = Math.min(Math.max(drag.y + dy / layout.unit, -spare), spare);
    section.classList.add('puck-switching');
    drag.trail.push({ x: puck.x, y: puck.y, time: e.timeStamp });
    while (e.timeStamp - drag.trail[0].time > 80) drag.trail.shift();
  });

  function release(e) {
    if (!drag) return;
    const { moved, trail } = drag;
    puck.pressed = false;
    drag = null;
    const first = trail[0], last = trail[trail.length - 1];
    const seconds = first ? (last.time - first.time) / 1000 : 0;
    const isFlick = seconds > 0.01 && e.timeStamp - last.time < 60;
    puck.vx = isFlick ? (last.x - first.x) / seconds : 0;
    puck.vy = isFlick ? (last.y - first.y) / seconds : 0;
    if (moved) setSide(nearestSide());
    else if (e.type === 'pointerup') setOpen(!open);
    animate();
  }
  root.addEventListener('pointerup', release);
  root.addEventListener('pointercancel', release);

  // Pointers are handled above, so this is for keyboards and assistive technologies.
  root.addEventListener('click', (e) => {
    if (e.detail !== 0) return;
    touched = true;
    setOpen(!open);
  });

  new ResizeObserver(() => {
    measure();
    settle();
    paint();
  }).observe(stage);
  measure();

  // The menu opens, the first time that it's seen.
  if (!reducedMotion.matches) {
    open = false;
    root.setAttribute('aria-expanded', false);
    section.classList.add('puck-closed');
    new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      setTimeout(() => { if (!touched) setOpen(true); }, 300);
    }, { threshold: 0.45 }).observe(walls);
  }
  settle();
  paint();
})();
