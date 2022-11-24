function LogIn(){
    return(
        <>
        <div className="login">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
        </div>
        <div className="loginBtn">
            <button>Logga In</button>
        </div>
        </>
    )
}

export default LogIn;