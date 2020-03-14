import imageAsset from './assets/test.png'
import { redShift, invert, modShift } from './effect-glsl'
import createRegl from 'regl'
import { createFrameCatch } from './lib/frame-catch'
import { camera, createLoadCamera } from './lib/camera'
import { mouse } from './lib/mouse'

const regl = createRegl()
const frame = createFrameCatch(regl)

const img = new Image()
const loadImageBuffer = () => {
  initRegl()
}

const init = () => {
  img.src = imageAsset
  img.onload = loadImageBuffer
  img.onerror = console.log
}

init()

function initRegl() {
  const toy = regl({
    frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform vec2 iResolution;
      uniform vec2 iMouse;

      ${redShift}
      ${invert}
      ${modShift}

      varying vec2 uv;
      void main () {
        vec2 st = gl_FragCoord.xy / iResolution;

        vec2 offset = uv + (iMouse * vec2(1.0, -1.0)) / 10.0;
        vec4 color = redShift(texture, uv, offset);

        //vec4 color = modShift(texture, uv, st);

        gl_FragColor = invert(color);
        
        //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }`,

    vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,

    attributes: {
      position: [-2, 0, 0, -2, 2, 2],
    },

    uniforms: {
      texture: regl.prop('background'),
      iResolution: ({ viewportWidth, viewportHeight }) => [
        viewportWidth,
        viewportHeight,
      ],
      iMouse: ({ viewportWidth, viewportHeight }) => [
        mouse.x / viewportWidth,
        mouse.y / viewportHeight,
      ],
      iGlobalTime: regl.prop('iGlobalTime'),
    },

    count: 3,
  })

  createLoadCamera(regl)
  frame(() => {
    const background = camera.isWebcamLoaded
      ? camera.webcam.subimage(camera.video)
      : regl.texture(img)

    toy({
      background,
    })
  })
}
