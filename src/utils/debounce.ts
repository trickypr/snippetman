export function debounced(
  delay: number,
  fn: () => void | Promise<void>,
): { debounced: () => void; instant: () => void } {
  let timerId: number | null = null

  return {
    debounced: () => {
      if (timerId !== null) clearTimeout(timerId)
      timerId = setTimeout(fn, delay)
    },
    instant: fn,
  }
}
