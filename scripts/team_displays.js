// Scanlines and flickering on the team's displays

(function() {
  const section = document.getElementById("OurTeam");

  // All displays are drawn by one WebGL canvas, and then copied to each display.
  const glCanvas = document.createElement("canvas");
  const gl = glCanvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) {
    // The displays keep the static scanlines from their styles.
    return;
  }

  const VERTEX_SHADER = `
    attribute vec2 position;

    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // Draws a layer that goes over a display's text. Alpha darkens what's below it, and color adds light.
  const FRAGMENT_SHADER = `
    precision highp float;

    uniform vec2 size; // in CSS pixels
    uniform float pixelRatio;
    uniform float time;
    uniform float seed;
    uniform float motion; // 1, or 0 for a steady picture

    float hash(float x) {
      return fract(sin(x * 127.1 + seed * 311.7) * 43758.5453);
    }

    float hash2(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233)) + seed) * 43758.5453);
    }

    float bell(float x) {
      return exp(-x * x);
    }

    void main() {
      vec2 p = vec2(gl_FragCoord.x, size.y * pixelRatio - gl_FragCoord.y) / pixelRatio;
      vec2 uv = p / size;

      // Scanlines that crawl down the screen.
      float line = 0.5 + 0.5 * cos(6.2832 * (p.y / 3.0 - time * 0.9));
      float dark = 0.43 * line * line;

      // A bright bar that rolls down the screen, with a dim trail.
      float roll = fract(time * 0.16 + hash(1.0)) * 1.9 - 0.45;
      float bar = bell((uv.y - roll) / 0.1);
      float trail = smoothstep(roll - 0.5, roll, uv.y) * step(uv.y, roll);

      // A thin, torn line of interference, now and then.
      float tearFrame = floor(time * 9.0);
      float tearOn = step(0.88, hash(tearFrame + 40.0));
      float tear = motion * tearOn * bell((uv.y - hash(tearFrame)) * size.y / 1.4) * (0.35 + 0.65 * hash2(vec2(floor(p.x / 7.0), tearFrame)));

      // The flicker is a slight, constant shimmer, plus a short dip in power every few seconds.
      float shimmer = 0.05 * hash(floor(time * 24.0) + 7.0);
      float cycle = floor(time / 4.2 + hash(2.0));
      float into = fract(time / 4.2 + hash(2.0)) * 4.2;
      float start = 0.4 + 2.8 * hash(cycle + 90.0);
      float since = into - start;
      float dip = 0.6 * smoothstep(0.0, 0.03, since) * (1.0 - smoothstep(0.05, 0.12, since));
      float secondDip = 0.38 * smoothstep(0.34, 0.37, since) * (1.0 - smoothstep(0.4, 0.5, since)) * step(0.4, hash(cycle + 60.0));
      float flicker = motion * (shimmer + max(dip, secondDip));

      // Noise, and darker edges.
      float grain = hash2(floor(p * pixelRatio / max(1.0, floor(pixelRatio))) + fract(time) * 91.0);
      vec2 edge = abs(uv - 0.5) * 2.0;
      float vignette = 0.3 * smoothstep(0.7, 1.0, max(edge.x, edge.y * 0.95));

      float alpha = clamp(1.0 - (1.0 - dark) * (1.0 - flicker) * (1.0 - vignette) * (1.0 - 0.1 * grain) * (1.0 - 0.08 * motion * trail), 0.0, 1.0);
      float light = (0.17 * motion * bar + 0.05 * motion * trail + 0.5 * tear) * (1.0 - 0.6 * line) + 0.035 * (grain - 0.35);
      light = max(0.0, light) * (1.0 - flicker);

      gl_FragColor = vec4(vec3(0.34, 0.72, 1.0) * light, alpha);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return;
  }
  gl.useProgram(program);

  // A triangle that covers the whole canvas.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {};
  ["size", "pixelRatio", "time", "seed", "motion"].forEach((name) => uniforms[name] = gl.getUniformLocation(program, name));

  const displays = Array.from(section.querySelectorAll(".team-display"), (element, index) => {
    const canvas = document.createElement("canvas");
    canvas.className = "team-scanlines";
    canvas.setAttribute("aria-hidden", "true");
    element.append(canvas);
    element.toggleAttribute("data-shaded", true);
    return { canvas, ctx: canvas.getContext("2d"), seed: index + 1 };
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function draw(time) {
    const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
    displays.forEach(({ canvas, ctx, seed }) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelWidth = Math.round(width * pixelRatio);
      const pixelHeight = Math.round(height * pixelRatio);
      if (pixelWidth === 0 || pixelHeight === 0) {
        return;
      }
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      if (glCanvas.width < pixelWidth || glCanvas.height < pixelHeight) {
        glCanvas.width = Math.max(glCanvas.width, pixelWidth);
        glCanvas.height = Math.max(glCanvas.height, pixelHeight);
      }

      gl.viewport(0, 0, pixelWidth, pixelHeight);
      gl.uniform2f(uniforms.size, width, height);
      gl.uniform1f(uniforms.pixelRatio, pixelRatio);
      gl.uniform1f(uniforms.time, time);
      gl.uniform1f(uniforms.seed, seed);
      gl.uniform1f(uniforms.motion, reducedMotion.matches ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // WebGL's viewport starts at the bottom of its canvas.
      ctx.clearRect(0, 0, pixelWidth, pixelHeight);
      ctx.drawImage(glCanvas, 0, glCanvas.height - pixelHeight, pixelWidth, pixelHeight, 0, 0, pixelWidth, pixelHeight);
    });
  }

  let isVisible = false;
  let frame = null;

  function tick(now) {
    frame = null;
    // Without motion, the displays show steady scanlines.
    draw(reducedMotion.matches ? 0 : now / 1000);
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
  reducedMotion.addEventListener("change", schedule);
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
})();
