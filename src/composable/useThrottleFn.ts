// to do ts type & cancel
export const useThrottleFn = (fn: () => void, ms: number) => {
  let lastTime = 0

  return (): void => {
    const now = Date.now()
    if (now - lastTime > ms) {
      fn()
      lastTime = now
    }
  }
}
