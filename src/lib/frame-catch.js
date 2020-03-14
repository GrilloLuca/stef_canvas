export function createFrameCatch(regl) {
  return function frameCatch(func) {
    const loop = regl.frame((...args) => {
      try {
        func(...args)
      } catch (err) {
        loop.cancel()
        throw err
      }
    })
    return loop
  }
}
