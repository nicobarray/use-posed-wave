const { useState, useEffect, useRef } = require('react')
const { tween, easing } = require('popmotion')
const posed = require('react-pose').default
const { useTimedIndex } = require('use-timed-index')

const { wave, toString } = require('./wave')

const interpolatePoint = (pointA, pointB, t) => {
  const [xA, yA] = pointA
  const [xB, yB] = pointB

  return [xA + t * (xB - xA), yA + t * (yB - yA)]
}

const svgPathToList = svgPath => {
  return svgPath.split(' ').map(raw => {
    return raw
      .substring(1)
      .split(',')
      .map(Number)
  })
}

function useWave({
  size,
  amplitude,
  originOffset,
  optionalDuration,
  optionalFade
}) {
  const fade = !!optionalFade
  const duration = optionalDuration || 3000
  const index = useTimedIndex(2, duration) + 1
  const [paths, setPaths] = useState({})
  const WaveComponentRef = useRef()

  useEffect(() => {
    const paths = {
      a: wave({ ...size, y: (originOffset || 0) + size.y }),
      b: wave({
        ...size,
        y: size.y + amplitude
      })
    }

    const pathIds = Object.keys(paths)

    setPaths(paths)

    WaveComponentRef.current = posed.path(
      pathIds.reduce((config, id) => {
        config[id] = {
          d: toString(paths[id]),
          opacity: fade ? (id === 'a' ? 0.1 : 1) : 1,
          transition: {
            d: ({ from, to }) =>
              tween({
                from: 0,
                to: 1,
                duration,
                ease: easing.easeInOut
              }).pipe(t => {
                const fromList = svgPathToList(from)
                const toList = svgPathToList(to)

                return toString(
                  fromList.map((point, i) =>
                    interpolatePoint(point, toList[i], t)
                  )
                )
              }),
            opacity: { ease: 'easeInOut', duration: (duration * 3) / 4 }
          }
        }

        return config
      }, {})
    )
  }, [size])
  const pose = Object.keys(paths)[index % Object.keys(paths).length]
  const Path = WaveComponentRef.current
  return [Path, pose]
}

exports.usePosedWave = useWave

