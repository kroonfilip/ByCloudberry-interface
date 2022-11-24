import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FormUI from './FormUI';
import Home from './Home';
import Header from './Header';
import LogIn from './LogIn';


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
    < BrowserRouter>
      
        < Routes>
          < Route path="/" element={< Home />} />
          < Route path="/form" element={< FormUI />} />
          < Route path="/login" element={< LogIn />} />
        </Routes>
    
    </BrowserRouter>
   </>
  );
};
export default App;
