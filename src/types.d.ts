/// <reference types="gecko-types" />
/// <reference types="svelte" />

declare module '*.module.css'
declare module '*.sql'
declare module '*.svg'

declare module 'tailwind-shades' {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
  const halfShares = [150, 250, 350, 450, 550, 650, 750, 850] as const

  type Shades = (typeof shades)[number]
  type HalfShades = (typeof halfShares)[number]

  export default function shadesOf(
    hex: string,
    halfShades: false,
  ): Record<Shades, string>

  export default function shadesOf(
    hex: string,
    halfShades: true,
  ): Record<Shades | HalfShades, string>
}
