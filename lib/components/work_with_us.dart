import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// A form that asks what a client's app needs.
///
/// The form is sent by scripts/work_form.js.
class WorkWithUs extends StatelessComponent {
  const WorkWithUs({super.key});

  @override
  Component build(BuildContext context) {
    return div(id: 'WorkWithUs', classes: 'work', [
      h2(classes: 'work-title', [.text('Work With Us')]),
      p(classes: 'work-subtitle', [.text('Tell us what your app needs. We\'ll take it from there.')]),
      div(classes: 'work-ask', [
        form(
          id: 'workForm',
          classes: 'work-form',
          attributes: {'novalidate': ''},
          [
            div(classes: 'work-sender', [
              input(
                classes: 'work-field',
                attributes: {
                  'type': 'text',
                  'name': 'name',
                  'autocomplete': 'name',
                  'aria-label': 'Your name',
                  'placeholder': 'Your name',
                },
              ),
              input(
                classes: 'work-field',
                attributes: {
                  'type': 'email',
                  'name': 'email',
                  'autocomplete': 'email',
                  'aria-label': 'Your email',
                  'placeholder': 'Your email',
                },
              ),
            ]),
            textarea(
              classes: 'work-message',
              attributes: {
                'name': 'message',
                'rows': '3',
                'aria-label': 'What does your app need?',
                'placeholder': 'What does your app need?',
              },
              [],
            ),
            div(classes: 'work-controls', [
              div(
                classes: 'work-choices',
                attributes: {'role': 'group', 'aria-label': 'What you need'},
                [
                  label(classes: 'work-choice', [
                    input(attributes: {'type': 'checkbox', 'name': 'need', 'value': 'Package'}),
                    .text(' '),
                    span(
                      classes: 'work-check',
                      attributes: {'aria-hidden': 'true'},
                      [
                        svg(
                          attributes: {'viewBox': '0 0 16 16'},
                          [
                            path(
                              attributes: {
                                'd': 'M3.8 8.4l2.7 2.7 5.7-6',
                                'fill': 'none',
                                'stroke': 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                    .text(' Package '),
                  ]),
                  label(classes: 'work-choice', [
                    input(attributes: {'type': 'checkbox', 'name': 'need', 'value': 'Bug fix'}),
                    .text(' '),
                    span(
                      classes: 'work-check',
                      attributes: {'aria-hidden': 'true'},
                      [
                        svg(
                          attributes: {'viewBox': '0 0 16 16'},
                          [
                            path(
                              attributes: {
                                'd': 'M3.8 8.4l2.7 2.7 5.7-6',
                                'fill': 'none',
                                'stroke': 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                    .text(' Bug fix '),
                  ]),
                  label(classes: 'work-choice', [
                    input(attributes: {'type': 'checkbox', 'name': 'need', 'value': 'Feature'}),
                    .text(' '),
                    span(
                      classes: 'work-check',
                      attributes: {'aria-hidden': 'true'},
                      [
                        svg(
                          attributes: {'viewBox': '0 0 16 16'},
                          [
                            path(
                              attributes: {
                                'd': 'M3.8 8.4l2.7 2.7 5.7-6',
                                'fill': 'none',
                                'stroke': 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                              },
                              [],
                            ),
                          ],
                        ),
                      ],
                    ),
                    .text(' Feature '),
                  ]),
                ],
              ),
              button(
                classes: 'work-send',
                attributes: {'type': 'submit', 'aria-label': 'Send'},
                [
                  svg(
                    attributes: {
                      'fill': 'none',
                      'stroke': 'currentColor',
                      'stroke-width': '1.8',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                      'aria-hidden': 'true',
                      'viewBox': '0 0 20 20',
                    },
                    [
                      path(attributes: {'d': 'M10 16V4.5M5 9.5l5-5 5 5'}, []),
                    ],
                  ),
                ],
              ),
            ]),
          ],
        ),
        p(id: 'workStatus', classes: 'work-status', attributes: {'role': 'status'}, []),
      ]),
      div(classes: 'work-facts', [
        div([
          div(classes: 'work-fact', [.text('\$100 per hour')]),
          .text('Transparent prices'),
        ]),
        div([
          div(classes: 'work-fact', [.text('Funder callout')]),
          .text('We recognize every funder'),
        ]),
      ]),
    ]);
  }
}
