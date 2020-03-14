export const redShift = `
vec4 redShift(sampler2D texture, vec2 uv, vec2 offset) {
  vec4 redShift = texture2D(texture, offset);
  vec4 color = texture2D(texture, uv);
  color.r = redShift.r;
  return color;
}
`;

export const invert = `
vec4 invert(vec4 color) {
  return vec4(1.0 - color.r, 1.0 - color.g, 1.0 - color.b, color.a);
}
`;

export const modShift = `
  vec4 modShift(sampler2D texture, vec2 uv, vec2 st, vec2 time) {
    if( mod(st.y, time[0]) >= time[1] ) {
      vec2 uvGlitch = uv - vec2(time[0], 0.01);
      vec4 color = texture2D(texture, uvGlitch);
      return color;
    } else {
      return texture2D(texture, uv); ;
    }
  }
`;
