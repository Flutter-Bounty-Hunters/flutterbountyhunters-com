import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// An icon from [SuperEditorIcons], by its name.
Component icon(String name) => svg([
  Component.element(tag: 'use', attributes: {'href': '#se-$name'}),
]);

/// The icons that the painted screens use, which are drawn wherever [icon] is used.
class SuperEditorIcons extends StatelessComponent {
  const SuperEditorIcons({super.key});

  @override
  Component build(BuildContext context) {
    return svg(
      classes: 'hidden',
      attributes: {'aria-hidden': 'true'},
      [
        Component.element(
          tag: 'symbol',
          id: 'se-doc',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M6 3h8l4 4v14H6zM14 3v4h4'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-check',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M5 12l5 5 9-10'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-link',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(
              attributes: {
                'd': 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
              },
              [],
            ),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-bullets',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-numbers',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M10 6h10M10 12h10M10 18h10M4 5l1-1v5M4 14h2l-2 4h2'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-quote',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M5 5v14M10 8h10M10 12h10M10 16h6'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-code',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M9 8l-4 4 4 4M15 8l4 4-4 4'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-plus',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M12 5v14M5 12h14'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-smile',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            circle(attributes: {'cx': '12', 'cy': '12', 'r': '9'}, []),
            path(attributes: {'d': 'M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-mention',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            circle(attributes: {'cx': '12', 'cy': '12', 'r': '4'}, []),
            path(attributes: {'d': 'M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-4 7.5'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-send',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 12l16-8-6 17-3-7z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-hash',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M5 9h14M5 15h14M10 4L8 20M16 4l-2 16'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-search',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            circle(attributes: {'cx': '11', 'cy': '11', 'r': '6'}, []),
            path(attributes: {'d': 'M20 20l-4.5-4.5'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-menu',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 7h16M4 12h16M4 17h10'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-left',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 6h16M4 12h10M4 18h14'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-center',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 6h16M7 12h10M5 18h14'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-right',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 6h16M10 12h10M6 18h14'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-help',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            circle(attributes: {'cx': '12', 'cy': '12', 'r': '9'}, []),
            path(attributes: {'d': 'M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7M12 17h.01'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-home',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 11l8-7 8 7v9h-5v-6H9v6H4z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-chats',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 5h16v11H10l-4 4v-4H4z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-bell',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M6 17V11a6 6 0 0 1 12 0v6l1 1H5zM10 21h4'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-bookmark',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M7 4h10v16l-5-4-5 4z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-down',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M7 10l5 5 5-5'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-compose',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 20l1-5L16 4l4 4L9 19z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-reply',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M5 5v6a4 4 0 0 0 4 4h10M15 11l4 4-4 4'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-back',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M15 5l-7 7 7 7'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-more',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M5 12h.01M12 12h.01M19 12h.01', 'stroke-width': '3'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-close',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M7 7l10 10M17 7L7 17'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-up',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M12 19V5M6 11l6-6 6 6'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-shift',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M12 4l8 9h-4v6H8v-6H4z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-delete',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M9 5h11v14H9l-6-7zM12 9.5l5 5M17 9.5l-5 5'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-mic',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            rect(attributes: {'x': '9', 'y': '3', 'width': '6', 'height': '11', 'rx': '3'}, []),
            path(attributes: {'d': 'M5 11a7 7 0 0 0 14 0M12 18v3'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-signal',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 18v-2M9.5 18v-5M15 18v-8M20.5 18V6', 'stroke-width': '3.4'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-wifi',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(
              attributes: {
                'd': 'M2.5 9.5a14 14 0 0 1 19 0M6 13.5a9 9 0 0 1 12 0M9.7 17.2a3.6 3.6 0 0 1 4.6 0',
                'stroke-width': '2.6',
              },
              [],
            ),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-battery',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            rect(
              attributes: {'x': '1', 'y': '6.5', 'width': '20', 'height': '11', 'rx': '3.4', 'stroke-width': '1.4'},
              [],
            ),
            rect(
              attributes: {
                'x': '3',
                'y': '8.5',
                'width': '13',
                'height': '7',
                'rx': '1.8',
                'fill': 'currentColor',
                'stroke': 'none',
              },
              [],
            ),
            path(attributes: {'d': 'M23 10.5v3'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-inbox',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 13l3-8h10l3 8v6H4zM4 13h5l1.5 2.5h3L15 13h5'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-next',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M9 6l6 6-6 6'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-book',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M12 7v13M12 7c-2-2-5-2-8-2v13c3 0 6 0 8 2 2-2 5-2 8-2V5c-3 0-6 0-8 2'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-gear',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            circle(attributes: {'cx': '12', 'cy': '12', 'r': '3'}, []),
            path(
              attributes: {
                'd':
                    'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1',
              },
              [],
            ),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-pen',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M4 20l1-5L16 4l4 4L9 19z'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-image',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            rect(attributes: {'x': '4', 'y': '5', 'width': '16', 'height': '14', 'rx': '2'}, []),
            path(attributes: {'d': 'M4 16l5-5 5 5 2-2 4 4'}, []),
          ],
        ),
        Component.element(
          tag: 'symbol',
          id: 'se-trash',
          attributes: {'viewBox': '0 0 24 24'},
          children: [
            path(attributes: {'d': 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13'}, []),
          ],
        ),
      ],
    );
  }
}
