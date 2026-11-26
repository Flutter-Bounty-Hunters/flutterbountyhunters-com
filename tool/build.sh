#!/usr/bin/env bash
#
# Builds the website into build/jaspr.

set -euo pipefail
cd "$(dirname "$0")/.."

./tailwindcss -i styles/tailwind.css -o web/styles/tailwind.css --minify
# The page is rendered by a local server. Its port differs from the default (8080), so that this site can be
# built while other Jaspr sites are being served.
dart run jaspr_cli:jaspr build --port 8091

# Files that build_runner leaves next to the website, which aren't part of it.
rm -rf build/jaspr/packages build/jaspr/.dart_tool build/jaspr/.build.manifest
