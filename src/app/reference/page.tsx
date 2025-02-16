import { type Metadata } from 'next'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'

import { formatDate } from '@/lib/formatDate'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import ProjectSlide from '@/components/ProjectSlide'

import logoRenewBody from '@/images/clients/renewbody/renewbody-logo-all-white.png'
import logoPenefDark from '@/images/clients/renewbody/renew-body-logo-transparent.png'
import logoPenefLight from '@/images/clients/penef/penef-all-white.png'
import logoPropopulace from '@/images/clients/propopulace/propopulacelogowhite.png'
import imageLaptop from '@/images/laptop.jpg'
import logoDreampro from '@/images/clients/dreampro/DreamproLogoWhite.png'
import logoMujbiom from '@/images/clients/mujbiom/MujbiomLogo.png'
import logoVektoring from '@/images/clients/vektoring/vektoringLogo.png'
import logoFdrive from '@/images/clients/fdrive/Fdrivelogo.png'
import logoAskme from '@/images/clients/askme/Askmelogoowhite.png'

// Extend the type to include an object with a `default` property.
type ValidImageImport =
  | string
  | StaticImageData
  | { src: string }
  | { default: StaticImageData }

// Helper to always return a string URL.
function getImageSource(src: ValidImageImport): string {
  if (typeof src === 'string') return src
  if ('src' in src) return src.src
  if ('default' in src) return src.default.src
  // Fallback if none of the above match.
  return ''
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-accent">
          Reference
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => {
          // Normalize the client value to a string for the key and display.
          const clientKey =
            typeof caseStudy.client === 'string'
              ? caseStudy.client
              : getImageSource(caseStudy.client)

          return (
            <FadeIn key={clientKey}>
              <article>
                <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                  <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                    <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                      <Image
                        // Now the logo is normalized to a string URL.
                        src={getImageSource(caseStudy.logo)}
                        alt=""
                        className="h-16 w-16 flex-none"
                        unoptimized
                      />
                      <h3 className="mt-6 text-sm font-semibold text-accent sm:mt-0 lg:mt-8">
                        {clientKey}
                      </h3>
                    </div>
                    <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                      <p className="text-sm tracking-tight text-accent after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                        {caseStudy.service}
                      </p>
                      <p className="text-sm text-neutral-950 lg:mt-2">
                        <time dateTime={caseStudy.date}>
                          {formatDate(caseStudy.date)}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                    <p className="font-display text-4xl font-medium text-accent">
                      <Link href={caseStudy.href}>{caseStudy.title}</Link>
                    </p>
                    <div className="mt-6 space-y-6 text-base text-neutral-600">
                      {caseStudy.summary.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="mt-8 flex">
                      <Button
                        href={caseStudy.href}
                        aria-label={`Přečíst referenci: ${clientKey}`}
                      >
                        Přečíst referenci
                      </Button>
                    </div>
                    {caseStudy.testimonial && (
                      <Blockquote
                        author={caseStudy.testimonial.author}
                        className="mt-12"
                      >
                        {caseStudy.testimonial.content}
                      </Blockquote>
                    )}
                  </div>
                </Border>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </Container>
  )
}

const clients: Array<[string, string | StaticImageData]> = [
  ['Penef', logoPenefLight],
  ['RenewBody', logoRenewBody],
  ['Propopulace', logoPropopulace],
  ['DreamPro', logoDreampro],
  ['MujBiom', logoMujbiom],
  ['Vektoring', logoVektoring],
  ['Fdrive', logoFdrive],
  ['Ask-me', logoAskme],
]



export const metadata: Metadata = {
  title: 'Naše práce',
  description:
    'Věříme v efektivitu a maximální využití zdrojů, abychom našim klientům poskytli tu nejlepší hodnotu.',
}

export default async function Work() {
  let caseStudies = await loadCaseStudies()

  return (
    <>
      <PageIntro eyebrow="Naše práce" title="Ověřená řešení pro reálné výzvy.">
        <p>
          Věříme v efektivitu a maximální zhodnocení investic našich klientů.
          Proto se zaměřujeme na tvorbu robustních a škálovatelných řešení na
          míru, která přinášejí měřitelné výsledky a dlouhodobý užitek.
        </p>
      </PageIntro>

      <ProjectSlide />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Penef', logo: logoPenefDark }}
      >
        Hephasoft nám pomohl s klíčovou integrací našeho e-mailového marketingu.
        Potřebovali jsme propojit naši platformu s novým CRM systémem a oni to
        zvládli hladce a rychle. Výsledkem je efektivnější správa kampaní a
        lepší přehled o datech klientů. Oceňujeme jejich odbornost a proaktivní
        přístup.
      </Testimonial>


      <ContactSection />
    </>
  )
}
