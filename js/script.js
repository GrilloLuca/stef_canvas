import imageAsset from "../img/test.png";
// import _ from "lodash"
// import {glitch2, glitch3, glitch4, glitch5, glitch7, invertColors} from "./effects"

// console.log(imageAsset)

// var canvas;
// var ctx;
var img = new Image();
// var copy

var loadImageBuffer = () => {
  //   canvas.height = img.height;
  //   canvas.width = img.width;

  //   ctx.drawImage(img, 0, 0);

  //   var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // deep clone the image
  //   copy = _.cloneDeep(imageData.data);

  initRegl();
};

// var executeGlitch = (e) => {
//     let x, y
//     if(e != undefined) {
//         x = e.clientX;
//         y = e.clientY;
//     }

//     var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//     // invertColors(imageData.data)
//     glitch5(imageData, copy, x, y)

//     ctx.putImageData(imageData, 0, 0)
// }

// var setPixel = (imageData, x, y, p) => {
//     imageData.data[((y * (imageData.width * 4)) + (x * 4))] = p.r
//     imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1] = p.g
//     imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2] = p.b
// }
// var getPixel = (imageData, x, y) => {
//     return {
//         r: imageData.data[((y * (imageData.width * 4)) + (x * 4))],
//         g: imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1],
//         b: imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2]
//     }
// }

var init = () => {
  img.src = imageAsset;

  //   canvas = document.getElementById("canvas");
  //   ctx = canvas.getContext("2d");

  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  img.onload = loadImageBuffer;
  img.onerror = console.log;

  // canvas.addEventListener('mousemove', executeGlitch);
  // setInterval(executeGlitch, 100)
};

init();

function initRegl() {
  const regl = require("regl")();

  regl({
    frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform vec2 iResolution;
      
      varying vec2 uv;
      void main () {
        vec4 color = texture2D(texture, uv);

        color.r = 1.0;

        //imageData.data[i] = i%4 == 3 ? b : copy[i^(4*x)]

        vec2 st = gl_FragCoord.xy/iResolution;

        if( mod(st.x, 0.3) >= 0.1 ) {
            //gl_FragColor = vec4(st.x, 0.0, 0.0, 1.0);
            // color = texture2D(texture, uv * 1.0);
            vec2 uvGlitch = uv - vec2(0.0, 0.01);
            color = texture2D(texture, uvGlitch);
            gl_FragColor = color;
        } else {
            gl_FragColor = color;
        }

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
      iResolution: ctx => {
        return [ctx.viewportWidth, ctx.viewportHeight];
      }
    },

    count: 3
  })();
}
