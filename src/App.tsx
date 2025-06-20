import { Fragment } from 'react';
import R3F from './R3F/R3F';
import GlobalStyles from './Styles/GlobalStyles';
import UI from './UI/UI';

function App() {
  return (
    <Fragment>
      <GlobalStyles />
      <R3F />
      <UI />
    </Fragment>
  );
}

export default App;
