import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'puck.dart';
import 'super_editor/super_editor.dart';

/// The open source packages that we build and maintain.
class Packages extends StatelessComponent {
  const Packages({super.key});

  @override
  Component build(BuildContext context) {
    return div(id: 'Packages', classes: 'pb-[140px] lg:pb-[180px] text-center border-b-2 border-[#262626]', [
      div(classes: 'packages-intro', [
        img(
          src: '/images/packages/container-hangar.webp',
          alt: 'The bounty hunter walking out of a colossal armored container with a case of equipment',
          classes: 'packages-scene',
          attributes: {'width': '1670', 'height': '1010', 'loading': 'lazy'},
        ),
        div(classes: 'packages-pitch', [
          h2(classes: 'packages-title', [
            span([.text('What Flutter ')]),
            span([.text('doesn’t ship, ')]),
            span([.text('we build')]),
          ]),
          p(classes: 'packages-summary', [
            .text(
              'Some features take months to build and years to maintain. We turn them into open source packages, so your team can install them instead.',
            ),
          ]),
          a(
            href: 'https://pub.dev/packages/super_editor',
            classes: 'packages-flagship',
            attributes: {'target': '_blank'},
            [
              span(classes: 'packages-flagship-label', [.text('Our flagship')]),
              span(classes: 'packages-flagship-name', [.text('Super Editor')]),
              span([.text('The document editing toolkit for Flutter')]),
            ],
          ),
        ]),
      ]),
      // Super Editor: what people can build with it.
      SuperEditor(),
      // Puck: the section is an open puck menu, whose items show what it does.
      Puck(),
      // TODO:
      div(classes: 'hidden mb-[125px] w-full aspect-video bg-[#00000044]', [
        // Video Demo
      ]),
    ]);
  }
}
