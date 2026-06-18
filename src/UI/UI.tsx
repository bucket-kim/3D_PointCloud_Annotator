
import UIStyleContainer from './UIStyleContainer';
import AnnotationPanel from './components/AnnotationPanel/AnnotationPanel';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const UI = () => {
  return (
    <UIStyleContainer>
      <Header />
      <AnnotationPanel />
      <Footer />
    </UIStyleContainer>
  );
};

export default UI;
