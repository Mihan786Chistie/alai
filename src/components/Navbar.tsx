import './navbar.css';
import alai from '../assets/alai.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={alai} alt="" width="50px"/>
      </div>
      <div className="navbar-center">
        <h1>Create Timeline Slide</h1>
      </div>
    </nav>
  );
};

export default Navbar;