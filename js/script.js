import imageAsset from "../img/test.png";

const mouse = {
  x: 0,
  y: 0
};

window.addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

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
      
      varying vec2 uv;
      void main () {
        vec2 st = gl_FragCoord.xy/iResolution;

        vec4 redShift = texture2D(texture, uv + iMouse / 10.0);
        vec4 color = texture2D(texture, uv);
        
        color.r = redShift.r;
        
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

      iGlobalTime: regl.prop("iGlobalTime")
    },

    count: 3
  });

  regl.frame(() => {
    toy();
  });
}
