import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FormUI from './FormUI';
import Home from './Home';
import Header from './Header';
import LogIn from './LogIn';


const App = () => {
  return (
    <>
    < BrowserRouter>
      < Header />
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
