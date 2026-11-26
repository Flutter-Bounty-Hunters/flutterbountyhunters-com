import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// What a client says about working with us.
class HappyClients extends StatelessComponent {
  const HappyClients({super.key});

  @override
  Component build(BuildContext context) {
    return div(id: 'HappyClients', classes: 'clients', [
      h2(classes: 'clients-title', [.text('Happy Clients')]),
      // In the client's brand color, with their photo as the head in their logo
      figure(
        classes: 'client',
        attributes: {'style': '--brand: #3148ff; --brand-light: #4a63ff'},
        [
          div(classes: 'client-text', [
            blockquote([
              p(classes: 'client-lead', [.text('Matt has been an invaluable partner for Clearful.')]),
              p([
                .text(
                  'His technical knowledge, API design and implementation skills, and commitment to the open-source community have provided us with best-in-class solutions to our business problems.',
                ),
              ]),
              p([
                .text(
                  'We strongly recommend Matt and Flutter Bounty Hunters and are excited to continue working together.',
                ),
              ]),
            ]),
            figcaption([
              span(classes: 'client-name', [.text('Jeffrey Bunn')]),
              .text(', '),
              a(
                href: 'https://clearful.com',
                classes: 'client-company',
                attributes: {'target': '_blank'},
                [.text('Clearful')],
              ),
            ]),
          ]),
          div(classes: 'client-mark', [
            svg(
              attributes: {'aria-hidden': 'true', 'viewBox': '0 0 480 360'},
              [
                path(
                  attributes: {
                    'fill': '#fff',
                    'd':
                        'M72 204C130 204 150 240 175 280 195 312 215 324 240 324 265 324 285 312 305 280 330 240 355 204 408 204 450 204 480 235 480 275 480 320 440 360 395 360L85 360C40 360 0 320 0 275 0 235 30 204 72 204Z',
                  },
                  [],
                ),
              ],
            ),
            img(
              src: '/images/clients/clearful_testimonial_jeff.png',
              alt: 'Jeffrey Bunn',
              attributes: {'width': '256', 'height': '256'},
            ),
          ]),
        ],
      ),
    ]);
  }
}
