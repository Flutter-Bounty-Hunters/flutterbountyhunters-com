import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'super_editor/icons.dart';

/// Puck: the section is an open puck menu, whose items show what it does. People can drag, throw and tap
/// the puck, which scripts/puck.js runs.
class Puck extends StatelessComponent {
  const Puck({super.key});

  @override
  Component build(BuildContext context) {
    return section(
      classes: 'puck',
      attributes: {'data-side': 'right'},
      [
        div(classes: 'puck-intro', [
          h3(classes: 'puck-title', [.text('Puck')]),
          p(classes: 'puck-summary', [.text('A floating menu for Flutter apps.')]),
          a(
            href: 'https://pub.dev/packages/puck',
            classes: 'puck-link',
            attributes: {'target': '_blank'},
            [.text('Get Puck on pub.dev')],
          ),
        ]),
        div(classes: 'puck-stage', [
          div(classes: 'puck-walls', [
            div(classes: 'puck-level', []),
            div(
              classes: 'puck-item puck-item-drag',
              attributes: {
                'role': 'img',
                'aria-label':
                    'A puck that has been dragged along a curving path, from where it was to where a finger holds it',
                'style': '--i: -2',
              },
              [
                span(classes: 'puck-face', [
                  svg(
                    classes: 'puck-art',
                    attributes: {'aria-hidden': 'true', 'viewBox': '0 0 196 196'},
                    [
                      path(attributes: {'d': 'M121 142C150 132 154 104 126 96S80 84 84 56'}, []),
                    ],
                  ),
                  _dot(98, 146, 46, classes: 'puck-ghost'),
                  _dot(84, 56, 72, classes: 'puck-touch'),
                  _dot(84, 56, 46, classes: 'puck-mini'),
                ]),
              ],
            ),
            div(
              classes: 'puck-item puck-item-levels',
              attributes: {
                'role': 'img',
                'aria-label':
                    'A puck with a menu, where one of its items has opened a second level of items, further out',
                'style': '--i: -1',
              },
              [
                span(classes: 'puck-face', [
                  svg(
                    classes: 'puck-art',
                    attributes: {'aria-hidden': 'true', 'viewBox': '0 0 196 196'},
                    [
                      path(attributes: {'d': 'M43.8,42.5 A56 56 0 0 1 43.8,153.5'}, []),
                      path(attributes: {'d': 'M114.1,32.4 A102 102 0 0 1 114.1,163.6'}, []),
                    ],
                  ),
                  _dot(53.3, 44.7, 26, classes: 'puck-dot-light', child: icon('search')),
                  _dot(81.3, 65.1, 26, classes: 'puck-dot-light', child: icon('image')),
                  _dot(92, 98, 26, classes: 'puck-dot-on', child: icon('pen')),
                  _dot(81.3, 130.9, 26, classes: 'puck-dot-light', child: icon('link')),
                  _dot(53.3, 151.3, 26, classes: 'puck-dot-light', child: icon('send')),
                  _dot(124.3, 47, 24, classes: 'puck-dot-on', child: icon('left')),
                  _dot(136.5, 80.3, 24, classes: 'puck-dot-on', child: icon('center')),
                  _dot(136.5, 115.7, 24, classes: 'puck-dot-on', child: icon('right')),
                  _dot(124.3, 149, 24, classes: 'puck-dot-on', child: icon('quote')),
                  _dot(36, 98, 40, classes: 'puck-mini'),
                ]),
              ],
            ),
            div(
              classes: 'puck-item puck-item-menu',
              attributes: {
                'role': 'img',
                'aria-label': 'A puck at an edge, with its menu fanned out around it',
                'style': '--i: 0',
              },
              [
                span(classes: 'puck-face', [
                  svg(
                    classes: 'puck-art',
                    attributes: {'aria-hidden': 'true', 'viewBox': '0 0 196 196'},
                    [
                      path(attributes: {'d': 'M123.8,162.9 A70 70 0 0 1 123.8,33.1'}, []),
                    ],
                  ),
                  span(
                    classes: 'puck-dot',
                    attributes: {'style': '--x: 119.3; --y: 160.9; --d: 36; background: #d8672f'},
                    [
                      icon('bookmark'),
                    ],
                  ),
                  _dot(90.6, 135.1, 36, style: 'background: #7fb0d4', child: icon('image')),
                  _dot(80, 98, 36, style: 'background: #efe6d9', child: icon('pen')),
                  _dot(90.6, 60.9, 36, style: 'background: #74ad8f', child: icon('mic')),
                  _dot(119.3, 35.1, 36, style: 'background: #e0a43c', child: icon('send')),
                  _dot(150, 98, 46, classes: 'puck-mini'),
                ]),
              ],
            ),
            div(
              classes: 'puck-item puck-item-keyboard',
              attributes: {
                'role': 'img',
                'aria-label': 'A puck that has moved up, to stay above a keyboard',
                'style': '--i: 1',
              },
              [
                span(classes: 'puck-face', [
                  span(classes: 'puck-keys', [
                    span([
                      b([.text('e')]),
                      b([.text('r')]),
                      b([.text('t')]),
                      b([.text('y')]),
                      b([.text('u')]),
                      b([.text('i')]),
                    ]),
                    span([
                      b([.text('s')]),
                      b([.text('d')]),
                      b([.text('f')]),
                      b([.text('g')]),
                      b([.text('h')]),
                      b([.text('j')]),
                      b([.text('k')]),
                    ]),
                    span([
                      b([.text('x')]),
                      b([.text('c')]),
                      b([.text('v')]),
                      b([.text('b')]),
                      b([.text('n')]),
                      b([.text('m')]),
                    ]),
                  ]),
                  i(classes: 'puck-was', []),
                  svg(
                    classes: 'puck-arrow',
                    attributes: {'viewBox': '0 0 20 60'},
                    [
                      path(attributes: {'d': 'M10 58V4M3 11l7-7 7 7'}, []),
                    ],
                  ),
                  _dot(98, 57.7, 60.7, classes: 'puck-mini'),
                ]),
              ],
            ),
            div(
              classes: 'puck-item puck-item-throw',
              attributes: {
                'role': 'img',
                'aria-label':
                    'A puck sliding across a rink, shown at each moment of its path, until it stops at the edge',
                'style': '--i: 2',
              },
              [
                span(classes: 'puck-face', [
                  _dot(30, 98, 48, classes: 'puck-mini', style: 'opacity: 0.14'),
                  _dot(36.2, 98, 48, classes: 'puck-mini', style: 'opacity: 0.14'),
                  _dot(50, 98, 48, classes: 'puck-mini', style: 'opacity: 0.14'),
                  _dot(67.1, 98, 48, classes: 'puck-mini', style: 'opacity: 0.15'),
                  _dot(84.8, 98, 48, classes: 'puck-mini', style: 'opacity: 0.15'),
                  _dot(101.3, 98, 48, classes: 'puck-mini', style: 'opacity: 0.16'),
                  _dot(115.9, 98, 48, classes: 'puck-mini', style: 'opacity: 0.17'),
                  _dot(128.2, 98, 48, classes: 'puck-mini', style: 'opacity: 0.19'),
                  _dot(138.3, 98, 48, classes: 'puck-mini', style: 'opacity: 0.21'),
                  _dot(146.3, 98, 48, classes: 'puck-mini', style: 'opacity: 0.23'),
                  _dot(152.6, 98, 48, classes: 'puck-mini', style: 'opacity: 0.26'),
                  _dot(157.3, 98, 48, classes: 'puck-mini', style: 'opacity: 0.29'),
                  _dot(160.8, 98, 48, classes: 'puck-mini', style: 'opacity: 0.32'),
                  _dot(163.3, 98, 48, classes: 'puck-mini', style: 'opacity: 0.36'),
                  _dot(165.1, 98, 48, classes: 'puck-mini', style: 'opacity: 0.40'),
                  _dot(166.3, 98, 48, classes: 'puck-mini', style: 'opacity: 0.45'),
                  _dot(167.1, 98, 48, classes: 'puck-mini', style: 'opacity: 0.50'),
                  _dot(167.6, 98, 48, classes: 'puck-mini', style: 'opacity: 0.56'),
                  _dot(167.9, 98, 48, classes: 'puck-mini', style: 'opacity: 0.62'),
                  _dot(168, 98, 48, classes: 'puck-mini', style: 'opacity: 0.68'),
                  _dot(168.1, 98, 48, classes: 'puck-mini', style: 'opacity: 0.75'),
                  _dot(168.1, 98, 48, classes: 'puck-mini', style: 'opacity: 0.83'),
                  _dot(168, 98, 48, classes: 'puck-mini', style: 'opacity: 0.91'),
                  _dot(168, 98, 48, classes: 'puck-mini', style: 'opacity: 1.00'),
                ]),
              ],
            ),
            button(
              classes: 'puck-root',
              attributes: {'type': 'button', 'aria-expanded': 'true', 'aria-label': 'Puck menu'},
              [],
            ),
          ]),
          ul(classes: 'puck-captions', [
            li(
              attributes: {'style': '--i: -2'},
              [
                span([
                  b([.text('Drag it around,')]),
                  .text(' to keep it out of the way.'),
                ]),
              ],
            ),
            li(
              attributes: {'style': '--i: -1'},
              [
                span([
                  b([.text('Menus within menus,')]),
                  .text(' each level further out.'),
                ]),
              ],
            ),
            li(
              attributes: {'style': '--i: 0'},
              [
                span([
                  b([.text('Tap it,')]),
                  .text(' and your menu fans out.'),
                ]),
              ],
            ),
            li(
              attributes: {'style': '--i: 1'},
              [
                span([
                  b([.text('When the keyboard opens,')]),
                  .text(' it moves up.'),
                ]),
              ],
            ),
            li(
              attributes: {'style': '--i: 2'},
              [
                span([
                  b([.text('Let go,')]),
                  .text(' and it springs to the nearest edge.'),
                ]),
              ],
            ),
          ]),
        ]),
      ],
    );
  }
}

/// A dot in a puck item's picture, which is 196 units wide, centered at [x], [y], with diameter [d].
Component _dot(num x, num y, num d, {String? classes, String? style, Component? child}) {
  return span(
    classes: classes == null ? 'puck-dot' : 'puck-dot $classes',
    attributes: {'style': '--x: $x; --y: $y; --d: $d${style == null ? '' : '; $style'}'},
    [?child],
  );
}
