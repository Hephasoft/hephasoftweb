'use client'

import { useState } from 'react'
import Link from 'next/link'
// Import komponent Logo a Logomark
import { Logo, Logomark } from '@/components/Logo'
import { Eye, EyeClosed } from 'lucide-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      // Přesměruj na chráněnou stránku
      router.push('/obchodni-pripady')
    }
  }

  return (
    <main className="bg-white">
      <div className="flex flex-1 items-center justify-center px-4 py-4 pt-32 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          {/* Logo sekce */}
          <div className="text-center">
            {/* Nový wrapper, zabírá celou šířku a centrování */}
            <div className="flex w-full justify-center">
              {/* Mobilní ikona – 200px */}
              <Logomark
                className="h-auto w-[200px] sm:hidden"
                invert={false}
                filled={true}
              />
              {/* Plné logo – 150px */}
              <Logo
                className="hidden h-auto w-[150px] sm:block"
                invert={false}
                filled={true}
              />
            </div>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Přihlašte se do klientského portálu Hephasoft
            </h2>
          </div>

          {/* Formulář pro přihlášení */}
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

            <div>
              {/* E-mail */}
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="E-mail"
                autoComplete="email"
                aria-label="E-mail"
                className="block w-full border-b-2 border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none sm:text-sm/6"
              />

              {/* Heslo */}
              <div className="relative mt-4">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Heslo"
                  autoComplete="current-password"
                  aria-label="Heslo"
                  className="block w-full border-b-2 border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="hover:bg-accent-hover flex w-full cursor-pointer justify-center rounded-md bg-accent px-3 py-1.5 text-sm/6 font-semibold text-white transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
              >
                {loading ? 'Načítám...' : 'Přihlásit se'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
