import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Zůstaňte v obraze s nejnovějšími marketingovými a IT trendy. V našem blogu vám přinášíme novinky, tipy od profesionálů a inovativní strategie, které vás udrží napřed před vašimi soupeři.',
}

export default async function Blog() {
  let articles = await loadArticles()

  return (
    <>
      <PageIntro eyebrow="Blog" title="Nejčerstvější marketingové a IT novinky">
        <p>
          Zůstaňte v obraze s nejnovějšími marketingovými a IT trendy. V našem
          blogu vám přinášíme novinky, tipy od profesionálů a inovativní
          strategie, které vás udrží napřed před vašimi soupeři.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {articles.map((article) => (
            <FadeIn key={article.href} className="group">
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-accent">
                        <Link href={article.href}>{article.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Publikováno</dt>
                        <dd className="absolute left-0 top-0 text-sm text-accent lg:static">
                          <time dateTime={article.date}>
                            {formatDate(article.date)}
                          </time>
                        </dd>
                        
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-accent/60">
                        {article.description}
                      </p>
                      <Button
                        href={article.href}
                        aria-label={`Read more: ${article.title}`}
                        className="mt-8"
                      >
                        Přečíst víc
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
