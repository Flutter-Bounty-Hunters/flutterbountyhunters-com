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

## Licensing
This marketing website is open source for viewing, however no code or assets within this
repository may be reproduced without express consent from Declaratve, Inc.
