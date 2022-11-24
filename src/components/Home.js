import  {React, useEffect, useState } from 'react';
import Header from './Header';

function Home () {
  const [APIStatus, setAPIStatus] = useState("");
    
  function handleServer() {
    if (APIStatus != "not_suspended") {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + process.env.RENDER_API_KEY,

      }
    };
    
    fetch('https://proxy.cors.sh/https://api.render.com/v1/services/srv-cd6gm4pgp3jlirg6l85g/resume', options)
      .then(response => response.json())
      .then(setAPIStatus("not_suspended"))
      .catch(err => console.error(err));
    }
    else {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + process.env.RENDER_API_KEY,
        }
      };
      
      fetch('https://proxy.cors.sh/https://api.render.com/v1/services/srv-cd6gm4pgp3jlirg6l85g/suspend', options)
        .then(response => response.json())
        .then(setAPIStatus("suspended"))
        .catch(err => console.error(err));
    }
  }

    useEffect(() => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Bearer ' + process.env.RENDER_API_KEY,
        }
      };  
      fetch('https://proxy.cors.sh/https://api.render.com/v1/services/srv-cd6gm4pgp3jlirg6l85g', options)
        .then(response => response.json())
        .then(response => setAPIStatus(response.suspended))
       
        .catch(err => console.error(err));
    }, []);
        
    function renderButton(){
      console.log("APISTATUS: " + APIStatus);
      
      return (
        //if APIStatus is not_suspended, the slider is checked
      <label className="switch">
        <input type="checkbox" checked={APIStatus == "not_suspended"} onChange={handleServer}/>
        <div className="slider"></div>
      </label>
      )
    }

    function renderStatusText(){
      if (APIStatus === "not_suspended") {
        return <p className='resText'>Server is currently up and running!</p>
      }
      else {
        return <p className='suspText'>Server is currently suspended</p>
      }
    }

  return (
    <>
    < Header/>


    <div className='apiStatus'>
       {renderStatusText()}
     
       {renderButton()}


    </div>
    </>
  )
}

export default Home;