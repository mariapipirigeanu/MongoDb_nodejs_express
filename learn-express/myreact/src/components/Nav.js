//import Rect from 'react';
//import './App.css';
import {Link} from 'react-router-dom';


function Nav() {
  const navStyle={
    color: 'bisque'
  };
  return (
    <nav>
        
        <ul className="nav-links">
          <Link style={navStyle} to='/home'>
          <li>Home</li>
          </Link>
           <Link style={navStyle} to='/messages'>
           <li>Messages</li>
           </Link>
           
        </ul>
    </nav>
  );
}

export default Nav;