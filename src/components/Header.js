import { NavLink } from 'react-router-dom';
import "./style.css";

function Header () {

  return (
    <header className='homeHeader'>
        <nav>
        <ul>
          <li>
          <NavLink to='/'>
                HOME
            </NavLink>
            </li>

            <li>
            <NavLink to='/form'>
              GRAPHDATA
            </NavLink>
          </li>
          <li>
            <NavLink to='/login'>
              LOG OUT
              
            </NavLink>
          </li>
        </ul>
        </nav>

    </header>
  )
}

export default Header;