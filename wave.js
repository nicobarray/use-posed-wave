function createContainer(size, originY, top = true, content) {
  const origin = top ? [0, 0] : [0, size.y]
  const from = top ? [size.x, 0] : [size.x, size.y]
  // The opposite line of the wave, which should be straight:
  /*
        origin --------------------- - from
         |                               |
         |                               |
         |                               |
        content - content - content - content
  */

  return [origin, ...content, from, origin]
}

function createWave(size, originY, resolution = 75) {
  let points = []
  let amplitude = 5
  for (let i = 1; i < resolution; i++) {
    points.push([
      Math.round((size.x / resolution) * i),
      Math.round(originY + Math.random() * amplitude)
    ])
  }

  return [[0, originY], ...points, [size.x, originY]]
}

exports.wave = function wave(size, top) {
  let height = Math.round(size.y / 3)

  if (!top) {
    height = size.y - height
  }

  const def = createContainer(size, height, top, createWave(size, height))

  return def
}

exports.toString = function toString(waveTuples) {
  const def = waveTuples.reduce(
    (acc, op) =>
      acc
        ? { head: acc.head, tail: [...acc.tail, op] }
        : { head: op, tail: [] },
    null
  )

  return def.tail.reduce(
    (acc, [x, y]) => `${acc} L${x},${y}`,
    'M' + def.head.join(',')
  )
}

