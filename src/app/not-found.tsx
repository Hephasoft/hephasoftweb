import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-accent sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-accent">
          Stránka nenalezena
        </h1>
        <p className="mt-2 text-sm text-accent/60">
          Omlouváme se, ale nemohli jsme najít stránku, kterou hledáte.
        </p>
        <Link
          href="/"
          className="mt-4 text-sm font-semibold text-accent transition hover:text-accent/70"
        >
          Jít zpět na domovskou stránku
        </Link>
      </FadeIn>
    </Container>
  )
}
