import { useId } from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-accent/50 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-accent"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-accent/20 outline-none checked:border-[0.5rem] checked:border-accent focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-accent">{label}</span>
    </label>
  )
}

function ContactForm() {
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-accent">
          Kontaktní formulář
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Jméno" name="name" autoComplete="name" />
          <TextInput
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput
            label="Společnost"
            name="company"
            autoComplete="organization"
          />
          <TextInput
            label="Telefon"
            type="tel"
            name="phone"
            autoComplete="tel"
          />
          <TextInput label="Zpráva" name="message" />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-accent/50">Budget</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput
                  label="25,000 – 50,000 Kč"
                  name="budget"
                  value="25,000 Kč"
                />
                <RadioInput
                  label="50,000 – 150,000 Kč"
                  name="budget"
                  value="50,000 Kč"
                />
                <RadioInput
                  label="150,000 – 500,000 Kč"
                  name="budget"
                  value="150,000 Kč"
                />
                <RadioInput
                  label="Více než 500,000 Kč"
                  name="budget"
                  value="500,000 Kč"
                />
              </div>
            </fieldset>
          </div>
        </div>
        <Button type="submit" className="mt-10">
          Odeslat
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-accent">
        Naše sídla
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Raději byste se sešli? Napište nám a domluvíme se.
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-accent">
          Napište nám
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Tomáš Křepel', 'tomas.k@hephasoft.cz'],
            ['Vojtěch Bobek', 'vojta.b@hephasoft.cz'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-accent">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-accent/60 hover:text-accent"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-accent">
          Sledujte nás
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Kontaktujte nás',
  description: 'Povězte nám o vašem projektu. Obratem se s vámi spojíme.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Kontaktujte nás" title="Povězte nám o vašem projektu">
        <p>Obratem se s vámi spojíme.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
