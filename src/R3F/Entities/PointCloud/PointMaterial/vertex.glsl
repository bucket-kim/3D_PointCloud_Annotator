attribute float scale;

attribute float selected;

varying float vSelected;

varying float vIsGround;
uniform float groundCutOff;
uniform float size;


void main() {
    
    vSelected = selected;

    vIsGround = position.y < groundCutOff ? 1.0 : 0.0;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    // gl_PointSize = 8.0;
    gl_PointSize = size * (100.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;

}