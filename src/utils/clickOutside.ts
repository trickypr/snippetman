export function clickOutside(node: Element, { enabled: initialEnabled, cb }) {
  const handleOutsideClick = ({ target }) => {
    if (!node.contains(target)) {
      cb()
    }
  }

  function update({ enabled }) {
    if (enabled) {
      window.addEventListener('click', handleOutsideClick)
    } else {
      window.removeEventListener('click', handleOutsideClick)
    }
  }

  update({ enabled: initialEnabled })
  return {
    update,
    destroy() {
      window.removeEventListener('click', handleOutsideClick)
    },
  }
}
