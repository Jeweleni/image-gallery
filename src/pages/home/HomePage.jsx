import NavBar from '../../components/navbar/NavBar';
import { Link } from 'react-router-dom';

import './home.css'

const HomePage = () => {
  return (
    
      <div className='home'>
      <NavBar/>
      <div className="main">
      <h2 className="text">
        Art makes <br />
        the world go round
      </h2>
      <button>
        <Link to="/login" className="button"> View Gallery </Link>
      </button>
    </div>
    </div>
  )
}

export default HomePage