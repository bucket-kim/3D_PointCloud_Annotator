import { Fragment, useEffect } from 'react';
import R3F from './R3F/R3F';
import GlobalStyles from './Styles/GlobalStyles';
import UI from './UI/UI';

function App() {
  useEffect(() => {
    const updateAspectRatioScale = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const targetAspectRatio = 4 / 3;
      const scale = 100 * (aspectRatio / targetAspectRatio);
      document.documentElement.style.setProperty(
        '--aspect-ratio-scale',
        `${scale}vh`,
      );
    };

    // Set initial value
    updateAspectRatioScale();

    // Update on resize
    window.addEventListener('resize', updateAspectRatioScale);

    return () => {
      window.removeEventListener('resize', updateAspectRatioScale);
    };
  }, []);

  return (
    <Fragment>
      <GlobalStyles />
      <R3F />
      <UI />
    </Fragment>
  );
}

export default App;
