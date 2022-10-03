// #version 150

uniform float u_intensity;
uniform float u_time;

in vec2 v_uv;
in float v_displacement;

void main() {
  vec3 color = vec3(0.5, 0.5, 1.0) * v_displacement;  // no distortion = black
                                                      // yes distortion = blue
  // vec3 color = vec3(v_uv * (1.0 - distort), 1.0);
  
  gl_FragColor = vec4(color, 1.0);
}