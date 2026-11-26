import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'icons.dart';

/// An AI chat, with a formatted prompt and a streamed, formatted answer.
class AiChatUseCase extends StatelessComponent {
  const AiChatUseCase({super.key});

  @override
  Component build(BuildContext context) {
    return div(classes: 'use-case use-case-ai', [
      h4(classes: 'use-case-title', [.text('AI chat')]),
      div(classes: 'use-case-text', [
        p([
          .text(
            'Give people room to write a real prompt. Stream the answer back as rich text, with headings, lists and quotes.',
          ),
        ]),
        p(classes: 'use-case-packages', [
          b([.text('super_editor_clipboard')]),
          .text(' pastes in text with its formatting.'),
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
              'An AI chat app in dark mode, with a list of conversations, formatted prompts, and an answer with headings, a callout and a numbered list, and an AI chat on a phone',
        },
        [
          div(classes: 'se-screen se-dark se-ai', [
            div(classes: 'se-ai-sidebar', [
              div(classes: 'se-lights', [i([]), i([]), i([])]),
              div(classes: 'se-row', [
                icon('inbox'),
                .text('Inbox'),
                small([.text('2')]),
              ]),
              div(classes: 'se-row', [
                icon('plus'),
                .text('Start conversation'),
              ]),
              div(classes: 'se-label', [.text('Workspaces')]),
              div(classes: 'se-row', [
                icon('down'),
                .text('Trail app'),
              ]),
              div(classes: 'se-row se-on', [
                span([.text('Map styles')]),
              ]),
              div(classes: 'se-row', [
                span([.text('Night colors')]),
              ]),
              div(classes: 'se-row', [
                span([.text('Labels on steep trails')]),
              ]),
              div(classes: 'se-row', [
                icon('down'),
                .text('Launch'),
              ]),
              div(classes: 'se-row', [
                span([.text('Store listing')]),
              ]),
              div(classes: 'se-row', [
                span([.text('Survey questions')]),
              ]),
              div(classes: 'se-ai-sidebar-end', [
                div(classes: 'se-row', [
                  icon('book'),
                  .text('Knowledge'),
                ]),
                div(classes: 'se-row', [
                  icon('gear'),
                  .text('Settings'),
                ]),
              ]),
            ]),
            div(classes: 'se-conversation', [
              div(classes: 'se-header', [
                span([.text('Trail app /')]),
                .text(' Map styles'),
                icon('more'),
              ]),
              div(classes: 'se-turns', [
                div(classes: 'se-prompt-sent', [
                  .text('Compare '),
                  b([.text('contour lines')]),
                  .text(' with '),
                  b([.text('shaded relief')]),
                  .text(' for '),
                  span(classes: 'se-mention', [.text('@New trail maps')]),
                  .text('.'),
                  br(),
                  .text('Hikers read the map in '),
                  i([.text('full sun')]),
                  .text(', so tell me what to build first.'),
                ]),
                div(classes: 'se-steps', [
                  span([
                    icon('next'),
                    .text('Thought for 8s'),
                  ]),
                  span([
                    icon('doc'),
                    .text('Read '),
                    b([.text('New trail maps')]),
                  ]),
                ]),
                div(classes: 'se-answer', [
                  div(classes: 'se-answer-title', [.text('Use shaded relief')]),
                  p([
                    .text('It shows how steep a trail is '),
                    b([.text('at a glance')]),
                    .text(', and it keeps its shape in full sun, where '),
                    code([.text('ContourLayer')]),
                    .text(' washes out.'),
                  ]),
                  div(classes: 'se-callout', [
                    b([.text('Keep in mind')]),
                    .text('Contour lines still suit hikers who are '),
                    i([.text('planning at home')]),
                    .text('.'),
                  ]),
                  div(classes: 'se-answer-heading', [.text('Build it in this order')]),
                  ol([
                    li([
                      .text('Draw the shading in '),
                      code([.text('TerrainLayer')]),
                      .text('.'),
                    ]),
                    li([
                      .text('Darken it in full sun, starting with the '),
                      span(classes: 'se-link', [.text('desert parks')]),
                      .text('.'),
                    ]),
                    li([
                      .text('Move each label clear '),
                      span(classes: 'se-streaming', [
                        span([.text('of ')]),
                        span([.text('the ')]),
                        span([.text('route')]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              div(classes: 'se-ai-composer', [
                div(classes: 'se-composer-text', [
                  .text('Turn this into tasks for the '),
                  b([.text('mobile team')]),
                  .text('. Each one needs:'),
                  ul([
                    li([.text('an owner')]),
                    li([
                      .text('a way to test it '),
                      i([.text('outdoors')]),
                      span(classes: 'se-caret', []),
                    ]),
                  ]),
                ]),
                div(classes: 'se-composer-actions', [
                  span(classes: 'se-choices', [
                    icon('plus'),
                    span([
                      icon('down'),
                      .text('Planning'),
                    ]),
                    span([
                      icon('down'),
                      .text('Auto'),
                    ]),
                  ]),
                  span(classes: 'se-stop', [icon('up')]),
                ]),
              ]),
            ]),
          ]),
          div(classes: 'se-phone', [
            div(classes: 'se-dark se-phone-screen se-ai-phone', [
              div(classes: 'se-status', [
                span([.text('9:46')]),
                span(classes: 'se-status-icons', [
                  icon('signal'),
                  icon('wifi'),
                  icon('battery'),
                ]),
              ]),
              div(classes: 'se-ai-phone-header', [
                span([icon('menu')]),
                b([
                  .text('Assistant'),
                  icon('next'),
                ]),
                span([icon('compose')]),
              ]),
              div(classes: 'se-turns', [
                div(classes: 'se-prompt-sent', [
                  .text('How should I test the new map in '),
                  b([.text('full sun')]),
                  .text('?'),
                ]),
                div(classes: 'se-answer', [
                  p([
                    .text('Go at '),
                    b([.text('noon')]),
                    .text(', when the glare is worst, and test it the way a hiker would:'),
                  ]),
                  ol([
                    li([
                      b([.text('Hold the phone')]),
                      .text(' at arm’s length.'),
                    ]),
                    li([
                      b([.text('Glance')]),
                      .text(' for two seconds, then look away.'),
                    ]),
                    li([
                      b([.text('Say the next turn')]),
                      .text(' out loud.'),
                    ]),
                  ]),
                  div(classes: 'se-quote', [.text('If hikers have to stop, the map has failed.')]),
                  div(classes: 'se-answer-heading', [.text('What to bring')]),
                  ul([
                    li([
                      .text('Build 88 with '),
                      code([.text('TerrainLayer')]),
                    ]),
                    li([
                      .text('Sunglasses, like '),
                      span(classes: 'se-streaming', [
                        span([.text('most ')]),
                        span([.text('hikers ')]),
                        span([.text('wear')]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              div(classes: 'se-ai-phone-composer', [
                div(classes: 'se-composer-text', [
                  .text('Make that a '),
                  b([.text('checklist')]),
                  .text(' for '),
                  span(classes: 'se-mention', [.text('@June')]),
                ]),
                div(classes: 'se-composer-actions', [
                  span(classes: 'se-button', [icon('plus')]),
                  span([icon('mic')]),
                  span(classes: 'se-stop', [icon('up')]),
                ]),
              ]),
            ]),
          ]),
        ],
      ),
    ]);
  }
}
