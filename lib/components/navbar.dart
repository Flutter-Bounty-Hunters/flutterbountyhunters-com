import 'package:jaspr/dom.dart';
import 'package:jaspr/jaspr.dart';

/// The site's links, which stick to the top of the window, below the hero.
///
/// The menu and the target brackets are run by scripts/navbar.js.
class Navbar extends StatelessComponent {
  const Navbar({super.key});

  @override
  Component build(BuildContext context) {
    return nav(
      id: 'navbar',
      classes: 'navbar group sticky top-0 z-40 h-[64px]',
      attributes: {'aria-label': 'Main'},
      [
        div(classes: 'flex items-center justify-end lg:justify-center px-[24px] h-full', [
          button(
            id: 'navbarToggle',
            classes:
                'lg:hidden flex items-center justify-center -mr-[12px] w-[48px] h-[48px] text-[20px] text-[#8FD8FF] hover:text-white',
            attributes: {
              'type': 'button',
              'aria-controls': 'navbarMenu',
              'aria-expanded': 'false',
              'aria-label': 'Menu',
            },
            [
              i(classes: 'fa-solid fa-bars group-data-[open]:hidden', attributes: {'aria-hidden': 'true'}, []),
              i(
                classes: 'fa-solid fa-xmark !hidden group-data-[open]:!inline',
                attributes: {'aria-hidden': 'true'},
                [],
              ),
            ],
          ),
          // A row of links on large screens, and a dropdown menu on small screens
          div(
            id: 'navbarMenu',
            classes:
                'hidden group-data-[open]:flex absolute inset-x-0 top-full flex-col px-[24px] pt-[8px] pb-[24px] max-h-[calc(100svh-64px)] overflow-y-auto bg-[#07101D] lg:flex lg:relative lg:inset-auto lg:flex-row lg:items-center lg:gap-[12px] lg:p-0 lg:h-full lg:max-h-none lg:overflow-visible lg:bg-transparent',
            [
              // Target brackets that lock onto the link for the section in view, or the link being pointed at
              span(
                id: 'navbarTarget',
                classes: 'navbar-target hidden lg:block',
                attributes: {'aria-hidden': 'true'},
                [],
              ),
              a(href: '#Services', classes: 'navbar-link', [.text('Services')]),
              a(href: '#HappyClients', classes: 'navbar-link', [.text('Happy Clients')]),
              a(href: '#OurFunders', classes: 'navbar-link', [.text('Our Funders')]),
              a(href: '#Packages', classes: 'navbar-link', [.text('Packages')]),
              a(href: '#OurTeam', classes: 'navbar-link', [.text('Our Team')]),
              a(href: '#WorkWithUs', classes: 'navbar-link', [.text('Work With Us')]),
            ],
          ),
        ]),
      ],
    );
  }
}
