import { Link } from 'react-router-dom';
import './css/Home.css';


function Home() {
  return (
    <div className="hero">
  <div className="hero-content">
    <h1>Michelle Dilhara</h1>
    <p>Empowering lives through art, storytelling, and global impact. Discover her world of cinema and service.</p>
    <Link to="/portfolio">
          {/* <button>View Portfolio</button> */}
    </Link>
  </div>
</div>
  );
}

export default Home;
