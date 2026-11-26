import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'ai_chat.dart';
import 'documents.dart';
import 'icons.dart';
import 'team_chat.dart';

/// Super Editor: what people can build with it. The screens are painted with HTML, and they're sized in "--u"
/// units.
class SuperEditor extends StatelessComponent {
  const SuperEditor({super.key});

  @override
  Component build(BuildContext context) {
    return section(classes: 'super-editor', [
      SuperEditorIcons(),
      h3(classes: 'super-editor-title', [.text('Super Editor')]),
      p(classes: 'super-editor-summary', [
        .text('Add rich text editing to your Flutter app, from a single chat box to a full document.'),
      ]),
      a(
        href: 'https://pub.dev/packages/super_editor',
        classes: 'pub-link',
        attributes: {'target': '_blank'},
        [.text('Get Super Editor on pub.dev')],
      ),
      DocumentsUseCase(),
      TeamChatUseCase(),
      AiChatUseCase(),
    ]);
  }
}
