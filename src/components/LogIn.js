import  {React, useRef} from 'react';


function LogIn(){

    localStorage.setItem('isLoggedIn', false);

    const username= useRef("");
    const password= useRef("");

    function handleLogIn(){
    
        if ( username.current.value === process.env.REACT_APP_USERNAME && password.current.value === process.env.REACT_APP_PASSWORD){
            console.log("rätt namn och lösenord");
            localStorage.setItem('isLoggedIn', true);
            window.location.href = '/';
        } else {
            alert('Incorrect username or password');
        }
    }

    return(
        <>
        <div className="login">
            <input type="text" ref={username} placeholder="Username" />
            <input type="password" ref={password} placeholder="Password" />
        </div>
        <div className="loginBtn">
            <button onClick={handleLogIn}>Log In</button>
        </div>
        </>
    )
}

export default LogIn;