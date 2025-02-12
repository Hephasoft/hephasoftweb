// src/components/ContactForm.tsx
'use client'

import { useId, useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  const id = useId()
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

export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        setStatus('Zpráva byla úspěšně odeslána.')
      } else {
        setStatus('Odeslání zprávy se nezdařilo.')
        console.error(result.error)
      }
    } catch (error) {
      console.error('Chyba při odesílání:', error)
      setStatus('Odeslání zprávy se nezdařilo.')
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={handleSubmit}>
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
              <legend className="text-base/6 text-accent/50">Rozpočet</legend>
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
        {status && <p className="mt-4 text-sm text-neutral-700">{status}</p>}
      </form>
    </FadeIn>
  )
}
