import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-accent/60',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-accent'}>{name}</strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Ústí nad Labem" invert={invert}>
          Velká hradební 2800,
          <br />
          400 01, Ústí nad Labem, Ústecký kraj
        </Office>
      </li>
      <li>
        <Office name="Velenice" invert={invert}>
          Velenice 72,
          <br />
          470 02, okres Česká Lípa, Liberecký kraj
        </Office>
      </li>
    </ul>
  )
}
