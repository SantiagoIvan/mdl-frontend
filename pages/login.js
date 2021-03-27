import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
    const [input, setInput] = useState("");
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(input)
      }
      
    return (
        <>
            <div className="title">
                <h2 className="titleLogin">Log in</h2>
                <div className="underline"/>
            </div>
            <form onSubmit={handleSubmit} className="loginForm">
                <input
                    className="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="email"
                    placeholder="Email address..."
                />
                <button className="btn" type="submit">Log In</button>
            </form>
        </>
    )
}

export default Login
