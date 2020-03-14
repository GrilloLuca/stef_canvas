import imageAsset from "../img/stef2.jpg";
import { redShift, invert, modShift } from "./effect-glsl";
import createRegl from "regl";

const regl = createRegl();

loadCamera()

var img = new Image();
var loadImageBuffer = () => {
  initRegl();
};

var init = () => {
  img.src = imageAsset;
  img.onload = loadImageBuffer;
  img.onerror = console.log;
};

init();

function initRegl() {
  const toy = regl({
      frag: `
        precision mediump float;
        uniform sampler2D texture;
        uniform vec2 iResolution;
        uniform vec2 iMouse;
        uniform vec2 time;

        ${redShift}
        ${invert}
        ${modShift}

        varying vec2 uv;
        void main () {
          vec2 st = gl_FragCoord.xy / iResolution;

          //vec2 offset = uv + (iMouse * vec2(1.0, -1.0)) / 10.0;
          //vec4 color = redShift(texture, uv, offset);

          vec4 color = modShift(texture, uv, st, time);

          gl_FragColor = color;
          
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
        position: [-2, 0, 0, -2, 2, 2]
      },

      uniforms: {
        texture: regl.texture(img),
        iResolution: ({ viewportWidth, viewportHeight }) => [
          viewportWidth,
          viewportHeight
        ],
        iMouse: ({ viewportWidth, viewportHeight }) => {
          const m = [mouse.x / viewportWidth, mouse.y / viewportHeight];
          return m;
        },
        time: regl.prop('time'),
        iGlobalTime: regl.prop("iGlobalTime")
      },

      count: 3
  });

  regl.frame(({time}) => {
    toy({
      time: [
        Math.sin(time/10),
        Math.random()
      ]
    })
  });
}

function loadCamera() {

  navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
        function(stream) {
          var video = document.querySelector('video');
          video.srcObject = stream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        },
        function(err) {
          console.log("The following error occurred: " + err.name);
        }
    );
  } else {
    console.log("getUserMedia not supported");
  }
}
