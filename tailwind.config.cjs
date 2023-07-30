/**
 * @see {@link https://blog.logrocket.com/applying-dynamic-styles-tailwind-css/}
 */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

const mkColorVars = (name) =>
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    .map((id) => ({ id, var: withOpacity(`--${name}-${id}`) }))
    .reduce((acc, item) => ({ ...acc, [item.id]: item.var }), {})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,js,svelte}', 'static/index.html'],
  theme: {
    colors: {
      slate: mkColorVars('slate'),
      cyan: mkColorVars('cyan'),
    },
    extend: {},
  },
  plugins: [],
}
