import { NavLink } from 'react-router-dom';
import  {React, useEffect, useState } from 'react';
import "./style.css";

function Header () {
  const [APIStatus, setAPIStatus] = useState("");

  useEffect(() => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer *NYCKEL HÄR*'
        }
      };  
      fetch('https://proxy.cors.sh/https://api.render.com/v1/services/srv-cd6gm4pgp3jlirg6l85g', options)
        .then(response => response.json())
        .then(response => setAPIStatus(response.suspended))
       
        .catch(err => console.error(err));
    }, []);



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
            <NavLink to='/settings'>
              SETTINGS
              
            </NavLink>
          </li >
          <li>
            <NavLink to='/login'>
              LOG OUT
              
            </NavLink>
          </li >


        </ul>
        </nav>

    </header>
  )
}

export default Header;