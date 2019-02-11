# usePosedWave

> A React hook that returns a "react-pose" svg path component animated like a wave.

<br/>
<p align="center">
  <img width="300" height="200" src="https://files-sdolfbukfx.now.sh" alt="Waves">
</p>
<br/>

## What ?

Given a size and amplitude parameters, the hook returns an enhanced <path /> component and a "pose" string to pass it. By default, every 3s the wave goes down, morph a little, then up - indefinitely.

### Example

```javascript
function App() {
  // Configure the wave animation and get the component to render.
  // Hint: You could pass the screen width as `x` and any height as `y`
  // to make a full screen width animation.
  const [Wave, wavePose]  = usePosedWave({ size: { x: 200, y: 50 , amplitude: 25 });
  const [Foam, foamPose]  = usePosedWave({ size: { x: 200, y: 50 , amplitude: 35, originOffset: 15 });

  // The component being a SVG path tag, it must be wrapped inside a <svg/>
  // component.
  return (
    <svg width={size.x} height={size.y * 2} style={{ background: "sandybrown" }} >
      {Foam && <Foam pose={foamPose} fill="white" />
      {Wave && <Wave pose={wavePose} fill="teal" />}
    </svg>
  )
}
```

⚠️ Note: The component will re-render if the "size" parameter changes. Either
define it outside the component or with React.useState.

### Install

Has `react`, `react-pose` and `popmotion` as --peer dependencies.

```javascript
yarn add use-posed-wave
yarn add --peer react react-pose popmotion
```

or

```javascript
npm i use-posed-wave
npm i --peer react react-pose popmotion
```

## API

const { usePosedWave } = require('use-posed-wave')

- A react hook that retuns the SVG path component.
- Takes the following arguments:
  - Required:
    - `size: { x: number, y: number }` The bounding rect of the animation.
    - `amplitude: number` The animation's y distance it grows (in pixel).

  - Optional:
    - `optionalDuration: number || 3000` The duration for the wave to transit from one
  state to the other.
    - `optionalOffset: number || 0` The y offset to add to the generated path.
    - `optionalFade: boolean || false` Should the wave fade in and out during the
  transition?

## Todo

- [ ] Make the initial delay optional
- [ ] Return the path component only (without the pose string)
- [ ] Make the wave orientation dynamic (vertical, horizontal)

## Related

- [useTimedIndex](https://github.com/nicobarray/use-timed-index) - Get an index value auto-incremented by 1 every X ms.

## Acknowledgement

Without those libraries, this hook would not exists.

- [popmotion](https://popmotion.io)
- [react-pose](https://popmotion.io/pose/)
- [flubber](https://github.com/veltman/flubber)

## Created by

- [Nicolas Barray](https://github.com/nicobarray)

## License

MIT
