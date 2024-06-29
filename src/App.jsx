import AOS from 'aos';
import 'aos/dist/aos.css';
import HomePage from './pages/HomePage';

function App() {
  AOS.init({
    offset: 50,
    delay: 100,
    duration: 800,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',
  });
  
  return (
      <HomePage />
  );
}

export default App;
