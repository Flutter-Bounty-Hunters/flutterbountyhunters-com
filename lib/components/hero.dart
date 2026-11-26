import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// The top of the page: the bounty hunter, whose rifle scope projects the subtitle.
///
/// The light is drawn by scripts/scope_beam.js.
class Hero extends StatelessComponent {
  const Hero({super.key});

  @override
  Component build(BuildContext context) {
    return header(
      classes: 'relative overflow-hidden min-h-[max(600px,100svh)] lg:min-h-[clamp(600px,88svh,1080px)] bg-[#080B14]',
      [
        // Moonlit desert, painted at 2335x1080 with the skyline 60% of the way up
        img(
          src: '/images/hero/desert-night.webp',
          alt: '',
          classes: 'absolute inset-0 w-full h-full max-w-none object-cover pointer-events-none',
          attributes: {'width': '2335', 'height': '1080'},
        ),
        // Below desktop, the character stands still below the title, with his rifle resting on his shoulder.
        // His lower body is painted darker, toward the ground.
        // On desktop, the translate values are the character's center of visual mass within the image, so
        // that the left/top values place that point, rather than the center of the image's bounding box
        // (which the rifle skews down and to the right).
        Component.element(
          tag: 'picture',
          children: [
            source(
              attributes: {
                'media': '(max-width: 1023px)',
                'srcset': '/images/hero/bounty-hunter-resting.webp',
                'width': '764',
                'height': '1468',
              },
            ),
            img(
              src: '/images/hero/bounty-hunter.webp',
              alt: 'Flutter bounty hunter in power armor, holding a rifle',
              id: 'bountyHunter',
              classes:
                  'absolute left-1/2 lg:left-[30%] top-[67%] lg:top-1/2 translate-x-[-50%] translate-y-[-50%] lg:translate-x-[-46.2%] lg:translate-y-[-49%] w-auto h-auto max-w-[70%] lg:max-w-[34%] max-h-[50%] lg:max-h-[40%] lg:motion-safe:animate-float',
              attributes: {'width': '1184', 'height': '1012', 'fetchpriority': 'high'},
            ),
          ],
        ),
        // Light projected from the rifle's scope onto the subtitle. Drawn by the script at the end of the page.
        Component.element(
          tag: 'canvas',
          id: 'scopeBeam',
          classes: 'absolute inset-0 w-full h-full pointer-events-none mix-blend-screen',
          attributes: {'aria-hidden': 'true'},
          children: [],
        ),
        div(
          classes:
              'absolute z-[2] inset-x-0 top-[max(72px,11%)] px-[24px] text-center lg:left-[51%] lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:pl-0 lg:text-left',
          [
            h1([
              // Below desktop, the title is centered, so its perspective is centered too.
              Component.element(
                tag: 'picture',
                children: [
                  source(
                    attributes: {
                      'media': '(max-width: 1023px)',
                      'srcset': '/images/hero/title-centered.webp',
                      'width': '1400',
                      'height': '621',
                    },
                  ),
                  img(
                    src: '/images/hero/title.webp',
                    alt: 'Flutter Bounty Hunters',
                    classes:
                        'mx-auto lg:mx-0 w-[min(86vw,420px,calc(47svh-48px))] lg:w-[min(35vw,760px)] max-w-none h-auto',
                    attributes: {'width': '1500', 'height': '678', 'fetchpriority': 'high'},
                  ),
                ],
              ),
            ]),
            p(classes: 'mt-[8px] lg:mt-[min(1.2vw,26px)]', [
              span(
                id: 'hologram',
                classes:
                    'block relative mx-auto lg:mx-0 lg:ml-[max(-0.956vw,-20.8px)] w-[min(90vw,443px,calc(49.6svh-50px))] lg:w-[min(36.91vw,801.5px)]',
                [
                  img(
                    src: '/images/hero/subtitle-hologram.webp',
                    alt: 'Squash bugs. Build tools.',
                    classes: 'hologram-scanlines block w-full max-w-none h-auto',
                    attributes: {'width': '1544', 'height': '300'},
                  ),
                  span(classes: 'hologram-sweep absolute inset-0', attributes: {'aria-hidden': 'true'}, []),
                ],
              ),
            ]),
          ],
        ),
      ],
    );
  }
}
