import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// The companies that fund our open source work, whose logos the bounty hunter projects.
///
/// The beams are drawn by scripts/funders_beams.js.
class Funders extends StatelessComponent {
  const Funders({super.key});

  @override
  Component build(BuildContext context) {
    return div(id: 'OurFunders', classes: 'funders border-b-2 border-[#262626]', [
      Component.element(
        tag: 'canvas',
        id: 'fundersBeams',
        classes: 'funders-beams',
        attributes: {'aria-hidden': 'true'},
        children: [],
      ),
      img(
        src: '/images/funders/bounty-hunter-looking-up.webp',
        alt: '',
        id: 'fundersHunter',
        classes: 'funders-hunter',
        attributes: {'width': '1449', 'height': '810'},
      ),
      Component.element(
        tag: 'canvas',
        id: 'fundersBeamsInFront',
        classes: 'funders-beams',
        attributes: {'aria-hidden': 'true'},
        children: [],
      ),
      div(classes: 'funders-stage', [
        h2(classes: 'funders-title', [.text('They keep the lights on')]),
        // x and y are the center of each funder, within the 1440x1080 layout that's described in tailwind.css
        div(classes: 'funders-list', [
          a(
            href: 'https://bringingfire.com',
            classes: 'funder',
            attributes: {'target': '_blank', 'style': '--x: 152; --y: 408'},
            [
              span(classes: 'funder-logo', [
                img(src: '/images/funders/bringing-fire_hologram.svg', alt: '', classes: 'funder-logo-hologram'),
                img(src: '/images/funders/bringing-fire_hologram.svg', alt: '', classes: 'funder-logo-solid'),
              ]),
              .text(' Bringing Fire '),
            ],
          ),
          a(
            href: 'https://superlist.com',
            classes: 'funder',
            attributes: {'target': '_blank', 'style': '--x: 432; --y: 340'},
            [
              span(classes: 'funder-logo', [
                img(src: '/images/funders/superlist_hologram.svg', alt: '', classes: 'funder-logo-hologram'),
                img(src: '/images/funders/superlist_hologram.svg', alt: '', classes: 'funder-logo-solid'),
              ]),
              .text(' Superlist '),
            ],
          ),
          a(
            href: 'https://clickup.com',
            classes: 'funder',
            attributes: {'target': '_blank', 'style': '--x: 720; --y: 318'},
            [
              span(classes: 'funder-logo', [
                img(src: '/images/funders/clickup_hologram.svg', alt: '', classes: 'funder-logo-hologram'),
                img(src: '/images/funders/clickup_hologram.svg', alt: '', classes: 'funder-logo-solid'),
              ]),
              .text(' ClickUp '),
            ],
          ),
          a(
            href: 'https://clearful.com',
            classes: 'funder',
            attributes: {'target': '_blank', 'style': '--x: 1008; --y: 340'},
            [
              span(classes: 'funder-logo', [
                img(src: '/images/funders/clearful_hologram.svg', alt: '', classes: 'funder-logo-hologram'),
                img(src: '/images/funders/clearful_hologram.svg', alt: '', classes: 'funder-logo-solid'),
              ]),
              .text(' Clearful '),
            ],
          ),
          a(
            href: 'https://reflection.app',
            classes: 'funder',
            attributes: {'target': '_blank', 'style': '--x: 1288; --y: 408'},
            [
              span(classes: 'funder-logo', [
                img(src: '/images/funders/reflection-app_hologram.svg', alt: '', classes: 'funder-logo-hologram'),
                img(src: '/images/funders/reflection-app_hologram.svg', alt: '', classes: 'funder-logo-solid'),
              ]),
              .text(' Reflection '),
            ],
          ),
        ]),
        a(href: '#WorkWithUs', classes: 'funders-cta', [.text('Become a funder')]),
      ]),
    ]);
  }
}
