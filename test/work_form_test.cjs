const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('scripts/work_form.js', 'utf8');

function setup({ key = 'public-test-key', failure = false } = {}) {
  const field = (value) => ({ value, validity: { valid: true }, setAttribute() {}, removeAttribute() {}, focus() {} });
  const send = {};
  const listeners = {};
  const need = { ...field('Package'), checked: true };
  const status = { textContent: '', toggleAttribute() {} };
  let resets = 0;
  let formResets = 0;
  let token = '';
  let callbacks;
  let loader;
  const calls = [];
  const form = {
    elements: { name: field('Alice'), email: field('alice@example.com'), message: field('Help with Flutter') },
    querySelector: () => send,
    querySelectorAll: () => [need],
    addEventListener: (event, fn) => { listeners[event] = fn; },
    reset: () => { formResets++; },
  };
  const context = {
    window: {},
    document: {
      getElementById: (id) => ({ workForm: form, workStatus: status, workCaptcha: { dataset: { sitekey: key }, clientWidth: 280 } })[id],
      createElement: () => ({}),
      head: { appendChild: (script) => { loader = script; } },
    },
    grecaptcha: {
      render: (_, options) => { callbacks = options; return 0; },
      getResponse: () => token,
      reset: () => { resets++; token = ''; },
    },
    emailjs: { send: (...args) => { calls.push(args); return failure ? Promise.reject(new Error('network')) : Promise.resolve(); } },
  };
  vm.runInNewContext(source, context);
  return {
    calls, status, send,
    get resets() { return resets; },
    get formResets() { return formResets; },
    get loader() { return loader; },
    get callbacks() { return callbacks; },
    ready: () => context.window.workCaptchaReady(),
    solve: () => { token = 'verified-token'; },
    submit: () => listeners.submit({ preventDefault() {} }),
  };
}
const settle = () => new Promise(setImmediate);

test('missing key or unloaded API prevents sending', () => {
  for (const key of ['', 'public-test-key']) {
    const app = setup({ key });
    app.submit();
    assert.equal(app.calls.length, 0);
    assert.match(app.status.textContent, /unavailable/);
    if (!key) assert.equal(app.loader, undefined);
  }
});
test('unsolved and expired challenges prevent sending', () => {
  const app = setup();
  app.ready();
  assert.equal(app.callbacks.size, 'compact');
  app.submit();
  assert.equal(app.calls.length, 0);
  assert.match(app.status.textContent, /complete the CAPTCHA/);
  app.callbacks['expired-callback']();
  assert.match(app.status.textContent, /expired/);
  app.submit();
  assert.equal(app.calls.length, 0);
});
for (const failure of [false, true]) {
  test(`verified send ${failure ? 'failure' : 'success'} resets token and blocks duplicate submissions`, async () => {
    const app = setup({ failure });
    app.ready();
    app.solve();
    app.submit();
    app.submit();
    await settle();
    assert.equal(app.calls.length, 1);
    assert.equal(app.calls[0][2]['g-recaptcha-response'], 'verified-token');
    assert.equal(app.resets, 1);
    assert.equal(app.formResets, failure ? 0 : 1);
    assert.equal(app.send.disabled, false);
    assert.match(app.status.textContent, failure ? /didn't send/ : /Thanks/);
    app.submit();
    await settle();
    assert.equal(app.calls.length, 1);
  });
}
test('script and widget errors explain recovery', () => {
  const app = setup();
  app.loader.onerror();
  assert.match(app.status.textContent, /failed to load/);
  app.ready();
  app.callbacks['error-callback']();
  assert.match(app.status.textContent, /reload/);
});
