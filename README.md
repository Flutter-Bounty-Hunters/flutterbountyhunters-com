# Flutter Bounty Hunters
Welcome to the Flutter Bounty Hunters.

This repository holds our marketing website implementation.

## Technologies
 * The site is statically generated with [Jaspr](https://jaspr.site). No Dart is shipped to the browser.
 * The site is styled with Tailwind, using the `tailwindcss` (v3) executable in this directory.
 * The Work With Us form is sent without a server, through EmailJS.

## Where things are
 * **lib/** - The page and its components. The Super Editor section's painted screens are in
   `lib/components/super_editor/`.
 * **scripts/** - JavaScript that's written directly into the page when it's generated.
 * **styles/** - The source of the stylesheet, which is compiled to `web/styles/tailwind.css`.
 * **web/** - Files that are deployed as they are, like images.

## Develop
Run `dart pub get` once. Then:

 * `tool/serve.sh` runs the site at http://localhost:8080. It uses its own proxy port (5571), so it can run next to
   other Jaspr sites. If 8080 is taken, add `--port 8081`. It warns that there's no `.client.dart` file, which is
   intentional. Reload the browser by hand to see changes.
 * `tool/build.sh` builds the site into `build/jaspr`, the same way that it's built for deployment.

## Contact form CAPTCHA setup

The form requires a Google reCAPTCHA v2 checkbox response. Before deploying:

1. Register a **reCAPTCHA v2 “I'm not a robot” checkbox** at
   https://www.google.com/recaptcha/admin/create for the website's domain.
2. Set the public `recaptchaSiteKey` in `lib/components/work_with_us.dart`.
   The production site key is configured; the form refuses to send if the key is removed.
3. In EmailJS, open template `template_fbh`, go to Settings, enable **reCAPTCHA V2 verification**,
   and save the matching **secret key** there. Never commit the secret or put it in browser code.
4. Deploy the site and verify a real submission. Confirm through EmailJS that requests without
   a valid CAPTCHA token are rejected. Browser validation alone does not prevent direct API abuse.

Coordinate the template setting with deployment: enabling verification makes the old form's
requests fail, while deploying without template verification leaves direct requests unprotected.

Run `node --test test/work_form_test.cjs` for the mocked form checks. These do not verify live
Google or EmailJS configuration. For local integration testing, use a separate reCAPTCHA
registration and EmailJS template so production settings stay isolated.

Provider setup: https://www.emailjs.com/docs/user-guide/adding-captcha-verification/

## Licensing
This marketing website is open source for viewing, however no code or assets within this
repository may be reproduced without express consent from Declaratve, Inc.
