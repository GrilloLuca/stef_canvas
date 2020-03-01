import imageAsset from "../img/stef2.jpg";
const regl = require("regl")();

var x = 0, y = 0

var img = new Image();

var init = () => {

  img.src = imageAsset;

  img.onload = initRegl;
  img.onerror = console.log;

  setInterval(initRegl, 50)

};

init();

function initRegl() {

  regl({
    frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform vec2 iResolution;
      uniform float x;
      uniform float y;
      
      varying vec2 uv;
      void main () {
        vec4 color = texture2D(texture, uv);        

        // color.r = 1.0;

        // imageData.data[i] = i%4 == 3 ? b : copy[i^(4*x)]

        vec2 st = gl_FragCoord.xy/iResolution;

        if( mod(st.y, ${Math.random()}) >= ${Math.random()} ) {
            vec2 uvGlitch = uv - vec2(${Math.random()}, 0.01);
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
      x, y,
      iResolution: ctx => {
        return [ctx.viewportWidth, ctx.viewportHeight];
      }
    },

    count: 3
  })();
}
