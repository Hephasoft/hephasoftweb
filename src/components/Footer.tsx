import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'

const navigation = [
  {
    title: 'Reference',
    links: [
      { title: 'RenewBody', href: '/reference/renewbody' },
      { title: 'Ask-me', href: '/reference/ask-me' },
      {
        title: 'Maturitní ples Brazílie',
        href: '/reference/maturitni-ples-brazilie-g4a-a-o8',
      },
      {
        title: (
          <>
            Zobrazit všechny <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/reference',
      },
    ],
  },
  {
    title: 'Společnost',
    links: [
      { title: 'O nás', href: '/o-nas' },
      { title: 'Jak fungujeme', href: '/jak-fungujeme' },
      { title: 'Blog', href: '/blog' },
      { title: 'Kontaktujte nás', href: '/kontakt' },
    ],
  },
  {
    title: 'Spojte se s námi',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-accent">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-accent/70">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-accent"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-accent">
        Odebírejte náš newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Nechte si od nás každý týden poslat newsletter plný praktických IT a
        marketingových tipů přímo od expertů.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          aria-label="E-mail"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-accent ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-accent focus:outline-none focus:ring-accent/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-accent text-white transition hover:bg-accent/80"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            © Hephasoft. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
