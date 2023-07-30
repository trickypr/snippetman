import type { RGBColor } from './tailwind-shades'

const { abs, min, max, round } = Math

export type HSLColor = [number, number, number]

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 */
/*@__PURE__*/
export function hslToRgb(color: HSLColor): RGBColor {
  const [h, s, l] = color
  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return [round(r * 255), round(g * 255), round(b * 255)]
}

/*@__PURE__*/
function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 */
/*@__PURE__*/
export function rgbToHsl(color: RGBColor): HSLColor {
  let [r, g, b] = color

  ;(r /= 255), (g /= 255), (b /= 255)
  const vmax = max(r, g, b),
    vmin = min(r, g, b)
  let h: number,
    s: number,
    l = (vmax + vmin) / 2

  if (vmax === vmin) {
    return [0, 0, l] // achromatic
  }

  const d = vmax - vmin
  s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin)
  if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0)
  if (vmax === g) h = (b - r) / d + 2
  if (vmax === b) h = (r - g) / d + 4
  h /= 6

  return [h, s, l]
}
