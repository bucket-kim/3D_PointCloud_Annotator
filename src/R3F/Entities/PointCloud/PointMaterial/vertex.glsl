attribute float scale;

attribute float selected;

varying float vSelected;

uniform float size;

void main() {
    
    vSelected = selected;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    // gl_PointSize = 8.0;
    gl_PointSize = size * (100.0 / -mvPosition.z);

    gl_Position = projectionMatrix * mvPosition;

}