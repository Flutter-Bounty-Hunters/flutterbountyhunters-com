import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// The team, on armored display plates.
///
/// The displays' scanlines and flicker are run by scripts/team_displays.js.
class Team extends StatelessComponent {
  const Team({super.key});

  @override
  Component build(BuildContext context) {
    return div(id: 'OurTeam', classes: 'team border-b-2 border-[#262626]', [
      h2(classes: 'team-title', [.text('Our Team')]),
      // Matt stands in front, between Simon and Angelo
      div(classes: 'team-members', [
        div(classes: 'team-member team-member-front', [
          img(
            src: '/images/team/matt-bust.webp',
            alt: 'Bust of Matt in bounty hunter armor',
            classes: 'team-bust',
            attributes: {'loading': 'lazy', 'width': '976', 'height': '688'},
          ),
          img(
            src: '/images/team/matt.webp',
            alt: 'Matt',
            classes: 'team-photo',
            attributes: {'loading': 'lazy', 'width': '105', 'height': '105'},
          ),
          div(classes: 'team-display', [
            h3(classes: 'team-name', [.text('Matt')]),
            p(classes: 'team-details', [
              span([.text('Chief')]),
              a(
                href: 'https://x.com/suprdeclarative',
                classes: 'team-handle',
                attributes: {'target': '_blank'},
                [
                  i(classes: 'fa-brands fa-x-twitter', attributes: {'aria-hidden': 'true'}, []),
                  .text(' '),
                  span(classes: 'sr-only', [.text('X: ')]),
                  .text('@SuprDeclarative'),
                ],
              ),
            ]),
          ]),
          img(
            src: '/images/team/matt-engraving.webp',
            alt: 'Former Flutter Team',
            classes: 'team-engraving',
            attributes: {'loading': 'lazy', 'width': '1952', 'height': '208'},
          ),
        ]),
        div(classes: 'team-member team-member-left', [
          img(
            src: '/images/team/simon-bust.webp',
            alt: 'Bust of Simon in bounty hunter armor',
            classes: 'team-bust',
            attributes: {'loading': 'lazy', 'width': '976', 'height': '688'},
          ),
          img(
            src: '/images/team/simon.webp',
            alt: 'Simon',
            classes: 'team-photo',
            attributes: {'loading': 'lazy', 'width': '105', 'height': '105'},
          ),
          div(classes: 'team-display', [
            h3(classes: 'team-name', [.text('Simon')]),
            p(classes: 'team-details', [
              span([.text('Specialist')]),
              a(
                href: 'https://x.com/devangelslondon',
                classes: 'team-handle',
                attributes: {'target': '_blank'},
                [
                  i(classes: 'fa-brands fa-x-twitter', attributes: {'aria-hidden': 'true'}, []),
                  .text(' '),
                  span(classes: 'sr-only', [.text('X: ')]),
                  .text('@DevAngelsLondon'),
                ],
              ),
            ]),
          ]),
          img(
            src: '/images/team/simon-engraving.webp',
            alt: 'Founder of Flutter Community',
            classes: 'team-engraving',
            attributes: {'loading': 'lazy', 'width': '1952', 'height': '208'},
          ),
        ]),
        div(classes: 'team-member team-member-right', [
          img(
            src: '/images/team/angelo-bust.webp',
            alt: 'Bust of Angelo in bounty hunter armor',
            classes: 'team-bust',
            attributes: {'loading': 'lazy', 'width': '976', 'height': '688'},
          ),
          img(
            src: '/images/team/angelo.webp',
            alt: 'Angelo',
            classes: 'team-photo',
            attributes: {'loading': 'lazy', 'width': '104', 'height': '105'},
          ),
          div(classes: 'team-display', [
            h3(classes: 'team-name', [.text('Angelo')]),
            p(classes: 'team-details', [
              span([.text('Hunter')]),
            ]),
          ]),
        ]),
      ]),
    ]);
  }
}
