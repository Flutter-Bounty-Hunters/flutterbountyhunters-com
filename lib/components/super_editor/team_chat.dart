import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'icons.dart';

/// A team chat, on desktop and on a phone, with formatted messages and mentions.
class TeamChatUseCase extends StatelessComponent {
  const TeamChatUseCase({super.key});

  @override
  Component build(BuildContext context) {
    return div(classes: 'use-case use-case-chat', [
      h4(classes: 'use-case-title', [.text('Team chat')]),
      div(classes: 'use-case-text', [
        p([
          .text(
            'Let people mention, format and quote in the composer, then show the same rich text in every message. It works on desktop and phones.',
          ),
        ]),
        p(classes: 'use-case-packages', [
          b([.text('super_keyboard')]),
          .text(' reports when the phone’s keyboard opens, and how tall it is.'),
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
              'A team chat on desktop, with channels, formatted messages and a formatted reply in its composer, and on a phone, where a teammate is being mentioned above the keyboard, along with close-ups of message layouts and composers with images, quotes, lists and inline styles',
        },
        [
          div(classes: 'se-screen se-dark se-chat', [
            div(classes: 'se-chat-top', [
              div(classes: 'se-chat-search', [
                icon('search'),
                .text('Search Trail app'),
              ]),
              icon('help'),
            ]),
            div(classes: 'se-rail', [
              span(classes: 'se-workspace', [.text('TA')]),
              div(classes: 'se-on', [
                span([icon('home')]),
                .text('Home'),
              ]),
              div([
                span([icon('chats')]),
                .text('DMs'),
              ]),
              div([
                span([icon('bell')]),
                .text('Activity'),
              ]),
              div([
                span([
                  icon('bookmark'),
                ]),
                .text('Later'),
              ]),
            ]),
            div(classes: 'se-sidebar', [
              div(classes: 'se-team', [
                .text('Trail app'),
                icon('down'),
                span([icon('compose')]),
              ]),
              div(classes: 'se-row', [
                icon('reply'),
                .text('Threads'),
              ]),
              div(classes: 'se-row', [
                icon('compose'),
                .text('Drafts'),
              ]),
              div(classes: 'se-label', [
                icon('down'),
                .text('Channels'),
              ]),
              div(classes: 'se-row', [
                icon('hash'),
                .text('general'),
              ]),
              div(classes: 'se-row', [
                icon('hash'),
                .text('design-review'),
              ]),
              div(classes: 'se-row se-on', [
                icon('hash'),
                .text('trail-maps'),
              ]),
              div(classes: 'se-row', [
                icon('hash'),
                b([.text('releases')]),
                small([.text('2')]),
              ]),
              div(classes: 'se-row', [
                icon('hash'),
                .text('field-support'),
              ]),
              div(classes: 'se-label', [
                icon('down'),
                .text('Direct messages'),
              ]),
              div(classes: 'se-row', [
                span(classes: 'se-avatar se-avatar-june se-avatar-small', [.text('JP')]),
                span(classes: 'se-here', [.text('June Park')]),
              ]),
              div(classes: 'se-row', [
                span(classes: 'se-avatar se-avatar-tom se-avatar-small', [.text('TO')]),
                span(classes: 'se-here', [.text('Tom Okafor')]),
              ]),
              div(classes: 'se-row', [
                span(classes: 'se-avatar se-avatar-mina se-avatar-small', [.text('MA')]),
                b([.text('Mina Alvi')]),
                small([.text('1')]),
              ]),
            ]),
            div(classes: 'se-channel', [
              div(classes: 'se-header', [
                icon('hash'),
                .text('trail-maps'),
                div(classes: 'se-members', [
                  span(classes: 'se-avatar se-avatar-nadia se-avatar-small', [.text('NR')]),
                  span(classes: 'se-avatar se-avatar-tom se-avatar-small', [.text('TO')]),
                  span(classes: 'se-avatar se-avatar-june se-avatar-small', [.text('JP')]),
                  span([.text('8')]),
                ]),
              ]),
              div(classes: 'se-tabs', [
                span(classes: 'se-on', [
                  icon('chats'),
                  .text('Messages'),
                ]),
                span([
                  icon('doc'),
                  .text('Files'),
                ]),
                span([
                  icon('bookmark'),
                  .text('Pins'),
                ]),
              ]),
              div(classes: 'se-messages', [
                div(classes: 'se-day', [
                  span([.text('Today')]),
                ]),
                div(classes: 'se-message', [
                  span(classes: 'se-avatar se-avatar-mina', [.text('MA')]),
                  div([
                    div(classes: 'se-author', [
                      .text('Mina Alvi '),
                      small([.text('9:38')]),
                    ]),
                    .text('Build 88 is on the test phones. Notes are in '),
                    span(classes: 'se-link', [.text('Release checklist')]),
                    .text('.'),
                    div(classes: 'se-photo', []),
                  ]),
                ]),
                div(classes: 'se-message', [
                  span(classes: 'se-avatar se-avatar-nadia', [.text('NR')]),
                  div([
                    div(classes: 'se-author', [
                      .text('Nadia Reyes '),
                      small([.text('9:41')]),
                    ]),
                    .text('The new map did great at Mesa Loop. '),
                    b([.text('12 hikers, no wrong turns.')]),
                    div(classes: 'se-reactions', [
                      i(classes: 'se-on', [.text('🎉 4')]),
                      i([.text('🚀 2')]),
                    ]),
                  ]),
                ]),
                div(classes: 'se-message', [
                  span(classes: 'se-avatar se-avatar-tom', [.text('TO')]),
                  div([
                    div(classes: 'se-author', [
                      .text('Tom Okafor '),
                      small([.text('9:43')]),
                    ]),
                    .text('Nice. Two things to check before we ship:'),
                    ol([
                      li([.text('Labels overlap on steep trails')]),
                      li([
                        code([.text('ElevationChart')]),
                        .text(' draws too slowly'),
                      ]),
                    ]),
                    div(classes: 'se-replies', [
                      span(classes: 'se-avatar se-avatar-june se-avatar-small', [.text('JP')]),
                      span(classes: 'se-avatar se-avatar-nadia se-avatar-small', [.text('NR')]),
                      b([.text('3 replies')]),
                      .text('Last reply at 9:47'),
                    ]),
                  ]),
                ]),
                div(classes: 'se-message', [
                  span(classes: 'se-avatar se-avatar-june', [.text('JP')]),
                  div([
                    div(classes: 'se-author', [
                      .text('June Park '),
                      small([.text('9:44')]),
                    ]),
                    div(classes: 'se-reply', [.text('Labels overlap on steep trails')]),
                    .text('I have a fix for this one. '),
                    span(classes: 'se-mention', [.text('@Nadia')]),
                    .text(' can you review it today?'),
                  ]),
                ]),
              ]),
              div(classes: 'se-composer', [
                div(classes: 'se-composer-tools', [
                  span(classes: 'se-button', [.text('B')]),
                  span(classes: 'se-button italic', [.text('I')]),
                  span(classes: 'se-button underline', [.text('U')]),
                  span(classes: 'se-button line-through', [.text('S')]),
                  span(classes: 'se-divider', []),
                  span(classes: 'se-button', [icon('link')]),
                  span(classes: 'se-divider', []),
                  span(classes: 'se-button', [
                    icon('numbers'),
                  ]),
                  span(classes: 'se-button se-on', [
                    icon('bullets'),
                  ]),
                  span(classes: 'se-button', [icon('quote')]),
                  span(classes: 'se-button', [icon('code')]),
                ]),
                div(classes: 'se-composer-text', [
                  .text('Great, '),
                  span(classes: 'se-mention', [.text('@June')]),
                  .text('. I’ll also check that:'),
                  ul([
                    li([
                      .text('the chart loads '),
                      b([.text('in one second')]),
                    ]),
                    li([.text('labels stay readable at night'), span(classes: 'se-caret', [])]),
                  ]),
                ]),
                div(classes: 'se-composer-actions', [
                  span(classes: 'se-button se-round', [icon('plus')]),
                  span(classes: 'se-button', [.text('Aa')]),
                  span(classes: 'se-button', [icon('smile')]),
                  span(classes: 'se-button', [
                    icon('mention'),
                  ]),
                  span(classes: 'se-send', [icon('send')]),
                ]),
              ]),
            ]),
          ]),
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
              div(classes: 'se-phone-header', [
                icon('back'),
                div([
                  b([
                    icon('hash'),
                    .text('trail-maps'),
                  ]),
                  small([.text('8 members')]),
                ]),
                icon('search'),
                icon('more'),
              ]),
              div(classes: 'se-messages', [
                div(classes: 'se-day', [
                  span([.text('Today')]),
                ]),
                div(classes: 'se-message', [
                  span(classes: 'se-avatar se-avatar-nadia', [.text('NR')]),
                  div([
                    div(classes: 'se-author', [
                      .text('Nadia Reyes '),
                      small([.text('9:41')]),
                    ]),
                    .text('The new map did great at Mesa Loop. '),
                    b([.text('12 hikers, no wrong turns.')]),
                    div(classes: 'se-reactions', [
                      i(classes: 'se-on', [.text('🎉 4')]),
                      i([.text('🚀 2')]),
                      i([
                        icon('smile'),
                      ]),
                    ]),
                  ]),
                ]),
                div(classes: 'se-message', [
                  span(classes: 'se-avatar se-avatar-june', [.text('JP')]),
                  div([
                    div(classes: 'se-author', [
                      .text('June Park '),
                      small([.text('9:44')]),
                    ]),
                    div(classes: 'se-reply', [.text('Labels overlap on steep trails')]),
                    .text('I have a fix for this one. '),
                    span(classes: 'se-mention', [.text('@Nadia')]),
                    .text(' can you review it today?'),
                  ]),
                ]),
              ]),
              div(classes: 'se-phone-composer', [
                div(classes: 'se-mentions', [
                  div([
                    span(classes: 'se-here', [
                      span(classes: 'se-avatar se-avatar-june se-avatar-small', [.text('JP')]),
                    ]),
                    b([.text('June Park')]),
                    small([.text('june')]),
                  ]),
                  div([
                    span(classes: 'se-here', [
                      span(classes: 'se-avatar se-avatar-julian se-avatar-small', [.text('JM')]),
                    ]),
                    b([.text('Julian Moss')]),
                    small([.text('jmoss')]),
                  ]),
                  div([
                    span([
                      span(classes: 'se-avatar se-avatar-juno se-avatar-small', [.text('JE')]),
                    ]),
                    b([.text('Juno Ellis')]),
                    small([.text('juno')]),
                  ]),
                  div([
                    span(classes: 'se-here', [
                      span(classes: 'se-avatar se-avatar-judit se-avatar-small', [.text('JV')]),
                    ]),
                    b([.text('Judit Varga')]),
                    small([.text('judit')]),
                  ]),
                  div([
                    span([
                      span(classes: 'se-avatar se-avatar-justin se-avatar-small', [.text('JC')]),
                    ]),
                    b([.text('Justin Cole')]),
                    small([.text('jcole')]),
                  ]),
                ]),
                div(classes: 'se-composer-text', [
                  .text('Looks '),
                  b([.text('great')]),
                  .text(' to me, @Ju'),
                  span(classes: 'se-caret', []),
                ]),
                div(classes: 'se-composer-actions', [
                  span(classes: 'se-button se-round', [icon('plus')]),
                  span(classes: 'se-button', [.text('Aa')]),
                  span(classes: 'se-button', [icon('smile')]),
                  span(classes: 'se-button', [
                    icon('mention'),
                  ]),
                  span(classes: 'se-send', [icon('send')]),
                ]),
              ]),
              div(classes: 'se-keyboard', [
                div([
                  b([.text('q')]),
                  b([.text('w')]),
                  b([.text('e')]),
                  b([.text('r')]),
                  b([.text('t')]),
                  b([.text('y')]),
                  b([.text('u')]),
                  b([.text('i')]),
                  b([.text('o')]),
                  b([.text('p')]),
                ]),
                div([
                  b([.text('a')]),
                  b([.text('s')]),
                  b([.text('d')]),
                  b([.text('f')]),
                  b([.text('g')]),
                  b([.text('h')]),
                  b([.text('j')]),
                  b([.text('k')]),
                  b([.text('l')]),
                ]),
                div([
                  b(classes: 'se-key-shift', [icon('shift')]),
                  b([.text('z')]),
                  b([.text('x')]),
                  b([.text('c')]),
                  b([.text('v')]),
                  b([.text('b')]),
                  b([.text('n')]),
                  b([.text('m')]),
                  b(classes: 'se-key-shift', [
                    icon('delete'),
                  ]),
                ]),
                div([
                  b(classes: 'se-key-wide', [.text('123')]),
                  b(classes: 'se-key-space', [.text('space')]),
                  b(classes: 'se-key-wide', [.text('return')]),
                ]),
                div(classes: 'se-keyboard-end', [
                  icon('smile'),
                  icon('mic'),
                ]),
              ]),
            ]),
          ]),
          // Message layouts and composers, on desktop, in the space beside the phone and beneath the window
          div(classes: 'se-part se-part-message se-light', [
            p([
              .text('Mesa Loop is '),
              b([.text('ready to test')]),
              .text('. This is the view from the second turn:'),
            ]),
            div(classes: 'se-photo', []),
            p([.text('Please try two things:')]),
            ol([
              li([
                .text('Read the next turn at '),
                i([.text('arm’s length')]),
              ]),
              li([
                .text('Open the '),
                span(classes: 'se-link', [.text('night map')]),
              ]),
            ]),
            div(classes: 'se-quote', [.text('If hikers have to stop, the map has failed.')]),
          ]),
          div(classes: 'se-part se-part-select se-light', [
            .text(' Keep the '),
            span(classes: 'se-selection se-selection-touch', [
              .text('sunset colors'),
              span(classes: 'se-popup se-toolbar', [
                span([.text('Copy')]),
                span(classes: 'se-divider', []),
                span([.text('Select all')]),
              ]),
            ]),
            .text(' at night? '),
          ]),
          div(classes: 'se-part se-part-attach se-light', [
            div(classes: 'se-part-files', [
              span(classes: 'se-photo', []),
              span(classes: 'se-photo', []),
              span(classes: 'se-photo', []),
            ]),
            .text(' Three views from the '),
            b([.text('second turn')]),
            span(classes: 'se-caret', []),
          ]),
          div(classes: 'se-part se-part-draft se-light', [
            .text('Great, '),
            span(classes: 'se-mention', [.text('@June')]),
            .text('. I’ll also check…'),
          ]),
          div(classes: 'se-part se-part-list se-dark', [
            p([
              .text('Before we ship, '),
              span(classes: 'se-mention', [.text('@Tom')]),
              .text(':'),
            ]),
            ol([
              li([
                .text('Draw '),
                code([.text('ElevationChart')]),
                .text(' faster'),
              ]),
              li([
                .text('Check the labels '),
                b([.text('at night')]),
              ]),
              li([
                .text('Fix the '),
                span(classes: 'se-misspelled', [.text('trale')]),
                .text(' names'),
              ]),
              li([span(classes: 'se-caret', [])]),
            ]),
          ]),
          div(classes: 'se-part se-part-reply se-dark', [
            div(classes: 'se-quote', [.text('Labels now move out of the way')]),
            .text(' It works on '),
            i([.text('every')]),
            .text(' trail I tried'),
            span(classes: 'se-caret', []),
          ]),
          div(classes: 'se-part se-part-inline se-dark', [
            .text('Call '),
            code([.text('tilt()')]),
            .text(' '),
            s([.text('on load')]),
            .text(' after the '),
            b([.text('first frame')]),
            .text('. See '),
            span(classes: 'se-link', [.text('Release checklist')]),
            .text('.'),
          ]),
        ],
      ),
    ]);
  }
}
