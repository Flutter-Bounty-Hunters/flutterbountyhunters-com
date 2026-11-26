import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// What we do for clients.
class Services extends StatelessComponent {
  const Services({super.key});

  @override
  Component build(BuildContext context) {
    return div(id: 'Services', classes: 'services', [
      h2(classes: 'services-title', [.text('Services')]),
      div(classes: 'service', [
        div(classes: 'service-text', [
          h3(classes: 'service-title', [.text('Package Creation')]),
          p(classes: 'service-description', [
            .text(
              'Your app needs something that Flutter doesn\'t do. We\'ll build and maintain a Pub package that does what you need. See our ',
            ),
            a(href: '#Packages', classes: 'service-link', [.text('existing packages')]),
            .text(' for examples.'),
          ]),
        ]),
        img(
          src: '/images/services/package-creation.webp',
          alt:
              'A yellow industrial mech loader standing in front of a staggered stack of armored space containers spray-painted with the Flutter logo inside a dimly lit cargo bay',
          classes: 'service-image',
          attributes: {'width': '1200', 'height': '900', 'loading': 'lazy'},
        ),
      ]),
      div(classes: 'service', [
        div(classes: 'service-text', [
          h3(classes: 'service-title', [.text('Bug Squashing')]),
          p(classes: 'service-description', [
            .text('A Flutter bug is upsetting your customers. We\'ll fix it, and submit a PR to the Flutter team.'),
          ]),
        ]),
        img(
          src: '/images/services/bug-squashing.webp',
          alt:
              'A xenomorph-style alien stretching out from a dark shadowy gap between two armored Flutter cargo containers, its claws gripping the container corners',
          classes: 'service-image',
          attributes: {'width': '1200', 'height': '900', 'loading': 'lazy'},
        ),
      ]),
      div(classes: 'service', [
        div(classes: 'service-text', [
          h3(classes: 'service-title', [.text('Feature Development')]),
          p(classes: 'service-description', [
            .text(
              'You need Flutter to do something that it doesn\'t do. No problem. We\'ll design and build the feature into Flutter, and then submit a PR to the Flutter team.',
            ),
          ]),
        ]),
        img(
          src: '/images/services/feature-development.webp',
          alt:
              'A massive armored Flutter space base with Dash birds flying out of its hangar bay and a glowing blue holographic blueprint of a new wing projected onto an adjacent concrete slab',
          classes: 'service-image',
          attributes: {'width': '1200', 'height': '900', 'loading': 'lazy'},
        ),
      ]),
    ]);
  }
}
