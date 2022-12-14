import React, { useState } from 'react';
import { store } from '../context/store';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import FormUI from './FormUI';
import Home from './Home';
import LogIn from './LogIn';
import Settings from './settings';
import TransparencyGraph from './TransparencyGraph';


const App = () => {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true' ? true : false
  );

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <LogIn setLoggedIn={setLoggedIn} />
      </BrowserRouter>
    );
  }

  return (
    <>
    <Provider store={store}>
    < BrowserRouter>
      
        < Routes>
          < Route path="/" element={< Home />} />
          < Route path="/form" element={< FormUI />} />
          < Route path="/settings" element={< Settings />} />
          < Route path="/transparency" element={< TransparencyGraph />} />
          < Route path="/login" element={< LogIn />} />
        </Routes>
    
    </BrowserRouter>
    </Provider>
   </>
  );
};
export default App;
