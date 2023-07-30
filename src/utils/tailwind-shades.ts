//! This file is licensed under MIT. It was originally sourced from here:
//! https://github.com/jxxe/tailwind-shades/blob/master/index.js
//! A copy of the license can be found here: https://mit-license.org/
//! This file has been modified

import { hslToRgb, rgbToHsl } from './color'

export type MutableRGBColor = [number, number, number]
export type RGBColor = readonly [number, number, number]

/**
 * Generate Tailwind-compatible shades from a single color
 * @param baseColor The color to generate shades from
 * @param halfShades Generate additional shades, e.g. at 150
 */
/*@__PURE__*/
export function shadesOf(
  baseColor: RGBColor,
  halfShades = false,
): Record<number, RGBColor> {
  const black = [0, 0, 0] as const
  const white = [255, 255, 255] as const

  let shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  if (halfShades)
    shades = [...shades, 150, 250, 350, 450, 550, 650, 750, 850].sort()

  let result: Record<number, RGBColor> = {}

  for (let shade of shades) {
    const originalShade = shade

    if (shade === 500) {
      result[shade] = baseColor
      continue
    }

    let isDarkShade = shade > 500
    if (isDarkShade) shade -= 500

    const percentage = shade / 500
    const startColor = isDarkShade ? black : baseColor
    const endColor = isDarkShade ? baseColor : white

    result[originalShade] = getColor(percentage, startColor, endColor)
  }

  return result
}

/*@__PURE__*/ /*@__INLINE__*/
export function hexToRgbArray(hex: string): RGBColor {
  const originalHex = hex

  hex = hex.replace('#', '')
  if (hex.length === 3) hex = hex + hex

  const r = hex.substring(0, 2)
  const g = hex.substring(2, 4)
  const b = hex.substring(4, 6)

  const rgb = [r, g, b].map((channel) => {
    try {
      const result = parseInt(channel, 16)
      if (result < 0 || result > 255) throw new Error()
      return result
    } catch {
      throw new Error(`Invalid hex color provided: ${originalHex}`)
    }
  })

  // Note: This should never be untrue
  return rgb as MutableRGBColor
}

/*@__PURE__*/ /*@__INLINE__*/
function getColor(
  percentage: number,
  start: RGBColor,
  end: RGBColor,
): RGBColor {
  return end.map((channel: number, index) =>
    Math.round(channel + percentage * (start[index] - channel)),
  ) as MutableRGBColor
}

/**
 * Will normalize the lightness of the color to 50%
 *
 * @param color The color to be normalized
 */
/*@__PURE__*/
export function normalize(color: RGBColor): RGBColor {
  const [h, s] = rgbToHsl(color)
  return hslToRgb([h, s, 0.5])
}

/*@__PURE__*/ /*@__INLINE__*/
export function toHex(color: RGBColor): string {
  return '#' + color.map((channel) => channel.toString(16)).join('')
}
