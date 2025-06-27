import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <div className="site-wrapper">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
