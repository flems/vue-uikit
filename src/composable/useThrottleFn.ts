export const useThrottleFn = <T extends (...args: unknown[]) => void>(fn: T, ms: number = 100) => {
  let lastTime = 0

  return (...args: Parameters<T>): void => {
    const now = Date.now()

    if (now - lastTime > ms) {
      fn(...args)
      lastTime = now
    }
  }
}
