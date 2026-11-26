import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

import 'components/funders.dart';
import 'components/happy_clients.dart';
import 'components/hero.dart';
import 'components/inline_script.dart';
import 'components/navbar.dart';
import 'components/packages.dart';
import 'components/services.dart';
import 'components/team.dart';
import 'components/work_with_us.dart';

class HomePage extends StatelessComponent {
  const HomePage({super.key});

  @override
  Component build(BuildContext context) {
    return const Component.fragment([
      Document.body(
        attributes: {
          'class': 'relative w-screen text-white font-[-apple-system, BlinkMacSystemFont, sans-serif] bg-[#0a0807]',
        },
      ),
      Hero(),
      // Sits below the hero, then sticks to the top of the window. Its height matches the scroll padding in tailwind.css.
      Navbar(),
      main_([
        Services(),
        HappyClients(),
        Funders(),
        Packages(),
        Team(),
        WorkWithUs(),
      ]),
      footer([]),

      // These run while the page is parsed, so they must come after the elements they use.
      InlineScript('navbar'),
      InlineScript('scope_beam'),
      InlineScript('funders_beams'),
      InlineScript('puck'),
      InlineScript('team_displays'),
      script(src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'),
      InlineScript('emailjs'),
      InlineScript('work_form'),
    ]);
  }
}
