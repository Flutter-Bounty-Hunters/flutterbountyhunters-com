import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'icons.dart';

/// A document editor, on desktop in dark and light themes, and on a phone.
class DocumentsUseCase extends StatelessComponent {
  const DocumentsUseCase({super.key});

  @override
  Component build(BuildContext context) {
    return div(classes: 'use-case use-case-documents', [
      h4(classes: 'use-case-title', [.text('Documents')]),
      div(classes: 'use-case-text', [
        p([
          .text(
            'Build a full document editor for desktop, web and phones. Include headings, images, tasks and quotes, and style all of it to match your app.',
          ),
        ]),
        p(classes: 'use-case-packages', [
          b([.text('attributed_text')]),
          .text(' carries the styles. '),
          b([.text('super_text_layout')]),
          .text(' paints the selection and caret.'),
        ]),
        a(
          href: 'https://pub.dev/packages/super_editor',
          classes: 'pub-link',
          attributes: {'target': '_blank'},
          [.text('Get Super Editor on pub.dev')],
        ),
      ]),
      div(
        classes: 'use-case-screens',
        attributes: {
          'role': 'img',
          'aria-label':
              'The same document in a desktop editor in dark mode, a desktop editor in light mode, and a phone editor, with a formatting toolbar, an image, a task list, a quote and a numbered list, along with close-ups of menus for blocks, styles, mentions and links',
        },
        [
          // The same document, with the light window in front of the dark one
          for (final theme in ['dark', 'light']) _document(theme),
          div(classes: 'se-phone', [
            div(classes: 'se-light se-phone-screen', [
              div(classes: 'se-status', [
                span([.text('9:46')]),
                span(classes: 'se-status-icons', [
                  icon('signal'),
                  icon('wifi'),
                  icon('battery'),
                ]),
              ]),
              div(classes: 'se-header', [
                icon('menu'),
                .text('Trail app'),
                small([icon('search')]),
              ]),
              div(classes: 'se-page', [
                div(classes: 'se-heading', [.text('New trail maps')]),
                div(classes: 'se-byline', [
                  span(classes: 'se-avatar se-avatar-nadia se-avatar-small', [.text('NR')]),
                  .text('Nadia Reyes'),
                ]),
                p([
                  .text('A hiker looks down for two seconds. The next turn has to be '),
                  span(classes: 'se-selection se-selection-touch', [
                    b([.text('readable at a glance')]),
                    span(classes: 'se-popup se-toolbar', [
                      span([.text('Cut')]),
                      span(classes: 'se-divider', []),
                      span([.text('Copy')]),
                      span(classes: 'se-divider', []),
                      span([.text('Paste')]),
                    ]),
                  ]),
                  .text(', in full sun and at arm’s length.'),
                ]),
                div(classes: 'se-photo', []),
                div(classes: 'se-caption', [.text('Mesa Loop, the first trail on the new map')]),
                div(classes: 'se-subheading', [.text('What has to work')]),
                div(classes: 'se-task se-done', [
                  span(classes: 'se-checkbox', [icon('check')]),
                  span([.text('Show the next turn in large type')]),
                ]),
                div(classes: 'se-task se-done', [
                  span(classes: 'se-checkbox', [icon('check')]),
                  span([.text('Keep contrast high in full sun')]),
                ]),
                div(classes: 'se-task', [
                  span(classes: 'se-checkbox', []),
                  span([
                    .text('Fit long trail names, '),
                    span(classes: 'se-mention', [.text('@Tom Okafor')]),
                  ]),
                ]),
                div(classes: 'se-quote', [.text('If hikers have to stop, the map has failed.')]),
              ]),
            ]),
          ]),
          // Pieces of an editor, on desktop, in the space beside the documents
          div(classes: 'se-part se-part-blocks se-dark', [
            div(classes: 'se-row', [
              b([.text('H1')]),
              .text('Heading 1'),
            ]),
            div(classes: 'se-row se-on', [
              b([.text('H2')]),
              .text('Heading 2'),
            ]),
            div(classes: 'se-row', [
              b([.text('¶')]),
              .text('Paragraph'),
            ]),
            div(classes: 'se-row', [
              icon('bullets'),
              .text('Bulleted list'),
            ]),
            div(classes: 'se-row', [
              icon('check'),
              .text('Task'),
            ]),
          ]),
          div(classes: 'se-part se-part-styles se-light', [
            span(classes: 'se-button se-on', [icon('left')]),
            span(classes: 'se-button', [icon('center')]),
            span(classes: 'se-button', [icon('right')]),
            span(classes: 'se-divider', []),
            i(classes: 'se-swatch se-swatch-ink se-on', []),
            i(classes: 'se-swatch se-swatch-rust', []),
            i(classes: 'se-swatch se-swatch-blue', []),
            i(classes: 'se-swatch se-swatch-green', []),
          ]),
          div(classes: 'se-part se-part-mention se-dark', [
            div(classes: 'se-task', [
              span(classes: 'se-checkbox', []),
              span([
                .text('Fit long trail names, '),
                span(classes: 'se-typing', [.text('@To')]),
                span(classes: 'se-caret', []),
              ]),
            ]),
            div(classes: 'se-popup se-menu', [
              div(classes: 'se-row se-on', [
                span(classes: 'se-avatar se-avatar-tom se-avatar-small', [.text('TO')]),
                .text('Tom Okafor'),
              ]),
              div(classes: 'se-row', [
                span(classes: 'se-avatar se-avatar-tomas se-avatar-small', [.text('TL')]),
                .text('Tomas Lind'),
              ]),
            ]),
          ]),
          div(classes: 'se-part se-part-link se-light', [
            icon('link'),
            span([.text('example.com/mesa-loop')]),
            span(classes: 'se-button', [icon('trash')]),
            span(classes: 'se-button se-on', [icon('check')]),
          ]),
          div(classes: 'se-part se-part-magnifier se-light', [
            .text(' Every trail with a steep cl'),
            span(classes: 'se-caret se-caret-touch', [
              span(classes: 'se-magnifier', [
                span([.text('steep cl')]),
                span(classes: 'se-caret', []),
                span([.text('imb')]),
              ]),
            ]),
            .text('imb '),
          ]),
        ],
      ),
    ]);
  }
}

/// The document, in the dark or light [theme] of the app.
Component _document(String theme) {
  return div(classes: 'se-screen se-$theme se-document', [
    div(classes: 'se-bar', [
      icon('menu'),
      span([.text('Trail app')]),
      span([.text('/')]),
      b([.text('New trail maps')]),
      div(classes: 'se-bar-end', [
        span(classes: 'se-avatar se-avatar-nadia se-avatar-small', [.text('NR')]),
        span(classes: 'se-avatar se-avatar-tom se-avatar-small', [.text('TO')]),
        span(classes: 'se-avatar se-avatar-june se-avatar-small', [.text('JP')]),
        span(classes: 'se-share', [.text('Share')]),
      ]),
    ]),
    div(classes: 'se-sidebar', [
      div(classes: 'se-label', [.text('Pages')]),
      div(classes: 'se-row', [
        icon('doc'),
        .text('Roadmap'),
      ]),
      div(classes: 'se-row se-on', [
        icon('doc'),
        .text('New trail maps'),
      ]),
      div(classes: 'se-row', [
        icon('doc'),
        .text('Release checklist'),
      ]),
      div(classes: 'se-row', [
        icon('doc'),
        .text('Hiker interviews'),
      ]),
      div(classes: 'se-label', [.text('Shared')]),
      div(classes: 'se-row', [
        icon('doc'),
        .text('Design principles'),
      ]),
      div(classes: 'se-row', [
        icon('doc'),
        .text('Onboarding'),
      ]),
    ]),
    div(classes: 'se-page', [
      div(classes: 'se-heading', [.text('New trail maps')]),
      div(classes: 'se-byline', [
        span(classes: 'se-avatar se-avatar-nadia se-avatar-small', [.text('NR')]),
        .text('Nadia Reyes'),
      ]),
      p([
        span(classes: 'se-wide-only', [.text('A hiker looks down for two seconds. ')]),
        .text('The next turn has to be '),
        span(classes: 'se-selection', [
          b([.text('readable at a glance')]),
          span(classes: 'se-popup se-toolbar', [
            span(classes: 'se-button se-on', [.text('B')]),
            span(classes: 'se-button italic', [.text('I')]),
            span(classes: 'se-button underline', [.text('U')]),
            span(classes: 'se-button line-through', [.text('S')]),
            span(classes: 'se-divider', []),
            span(classes: 'se-button', [
              icon('link'),
            ]),
            span(classes: 'se-button', [
              icon('code'),
            ]),
            span(classes: 'se-button', [
              icon('quote'),
            ]),
          ]),
        ]),
        .text(', in full sun and at arm’s length.'),
      ]),
      div(classes: 'se-photo', []),
      div(classes: 'se-caption', [.text('Mesa Loop, the first trail on the new map')]),
      div(classes: 'se-subheading', [.text('What has to work')]),
      div(classes: 'se-task se-done', [
        span(classes: 'se-checkbox', [icon('check')]),
        span([.text('Show the next turn in large type')]),
      ]),
      div(classes: 'se-task se-done', [
        span(classes: 'se-checkbox', [icon('check')]),
        span([.text('Keep contrast high in full sun')]),
      ]),
      div(classes: 'se-task', [
        span(classes: 'se-checkbox', []),
        span([
          .text('Fit long trail names, '),
          span(classes: 'se-mention', [.text('@Tom Okafor')]),
        ]),
      ]),
      div(classes: 'se-quote', [.text('If hikers have to stop, the map has failed.')]),
      div(classes: 'se-wide-only', [
        div(classes: 'se-subheading', [.text('Rollout')]),
        ol([
          li([
            b([.text('Test group:')]),
            .text(' four trails, starting with '),
            span(classes: 'se-link', [.text('Mesa Loop')]),
          ]),
          li([
            b([.text('Desert parks:')]),
            .text(' every trail with a steep climb'),
          ]),
        ]),
      ]),
    ]),
  ]);
}
