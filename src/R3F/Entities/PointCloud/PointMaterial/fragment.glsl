uniform vec3 color;

varying float vSelected;
varying float vIsGround;

    void main() {

        if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

        vec3 finalColor = vSelected > 0.5 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 0.0, 1.0);

        if (vIsGround > 0.5) {
            finalColor *= 0.3;
        }

        gl_FragColor = vec4( finalColor, 1.0 );

    }