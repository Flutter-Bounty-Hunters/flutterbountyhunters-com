/// The entrypoint for pre-rendering the site.
///
/// The site is fully static: it has no Jaspr client components, so this is the only
/// entrypoint, and no Dart is compiled to JavaScript or shipped to visitors.
library;

import 'package:jaspr/dom.dart';
import 'package:jaspr/server.dart';

import 'home_page.dart';
// This file is generated automatically by Jaspr, do not remove or edit.
import 'main.server.options.dart';
import 'site.dart';

void main() {
  Jaspr.initializeApp(options: defaultServerOptions);

  // Jaspr breaks long lines of HTML at element boundaries, which adds whitespace between them. Whitespace
  // can change how inline content is laid out (it's a space between a link and the period after it), so
  // the page is written without any whitespace that isn't in its components.
  // ignore: invalid_use_of_visible_for_testing_member
  MarkupRenderObject.maxHtmlLineLength = 1 << 30;

  runApp(
    const Document(
      lang: 'en',
      title: siteTitle,
      // No <base>, because with one, the "#section" links would reload the page whenever
      // its URL has a query, e.g., "/?utm_source=x".
      base: null,
      meta: {
        'description': siteDescription,
        'msapplication-TileColor': '#da532c',
        'msapplication-config': '/images/favicon/browserconfig.xml',
        'theme-color': '#ffffff',

        // Twitter
        'twitter:card': 'summary_large_image',
        'twitter:site': '@FlutterBounties',
        'twitter:url': '$siteUrl/',
        'twitter:title': siteTitle,
        'twitter:description': siteDescription,
        'twitter:image': _socialImageUrl,
        'twitter:image:alt': _socialImageAlt,
      },
      head: [
        link(
          rel: 'apple-touch-icon',
          href: '/images/favicon/apple-touch-icon.png',
          attributes: {'sizes': '180x180'},
        ),
        link(
          rel: 'icon',
          type: 'image/png',
          href: '/images/favicon/favicon-32x32.png',
          attributes: {'sizes': '32x32'},
        ),
        link(
          rel: 'icon',
          type: 'image/png',
          href: '/images/favicon/favicon-16x16.png',
          attributes: {'sizes': '16x16'},
        ),
        link(rel: 'manifest', href: '/images/favicon/site.webmanifest'),
        link(rel: 'mask-icon', href: '/images/favicon/safari-pinned-tab.svg', attributes: {'color': '#5bbad5'}),
        link(rel: 'shortcut icon', href: '/images/favicon/favicon.ico'),

        link(rel: 'canonical', href: '$siteUrl/'),

        // Open Graph Social Media
        meta(content: '$siteUrl/', attributes: {'property': 'og:url'}),
        meta(content: siteTitle, attributes: {'property': 'og:title'}),
        meta(content: siteDescription, attributes: {'property': 'og:description'}),
        meta(content: _socialImageUrl, attributes: {'property': 'og:image'}),
        meta(content: 'image/jpeg', attributes: {'property': 'og:image:type'}),
        meta(content: '1200', attributes: {'property': 'og:image:width'}),
        meta(content: '630', attributes: {'property': 'og:image:height'}),
        meta(content: _socialImageAlt, attributes: {'property': 'og:image:alt'}),
        meta(content: 'website', attributes: {'property': 'og:type'}),

        // Compiled from styles/tailwind.css.
        link(href: '/styles/tailwind.css', rel: 'stylesheet'),

        // Google Fonts
        link(rel: 'preconnect', href: 'https://fonts.googleapis.com'),
        link(rel: 'preconnect', href: 'https://fonts.gstatic.com', attributes: {'crossorigin': ''}),
        link(
          href:
              'https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,400..700;1,400&family=Geist+Mono:wght@400&family=Oxanium:wght@600;700;800&display=swap',
          rel: 'stylesheet',
        ),
      ],
      body: HomePage(),
    ),
  );
}

// Social cards need the image's full address.
const _socialImageUrl = '$siteUrl/images/social.jpg';
const _socialImageAlt =
    'Flutter Bounty Hunters. Squash bugs. Build tools. A bearded bounty hunter in rusty power armor, whose rifle '
    'scope projects the tagline in blue light.';
