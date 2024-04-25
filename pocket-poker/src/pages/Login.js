import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s");
const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [SignInError, setSignInError] = useState('')
  const [SignInSuccess, setSignInSuccess] = useState('')
  const navigate = useNavigate()

  const onButtonClick = async() => {
    // You'll update this function later...
    const { data, error } = await supabase.auth.signInWithPassword({'email':email, 'password':password})
    const session = supabase.auth.getSession()
    console.log(session, data,error)
    if(data) {
      setSignInSuccess("Logged in Successfully.")
      setSignInError("")
    }
    if(error){
      setSignInError("Error: Password and/or email is wrong. Try again.")
      setSignInSuccess("")
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      <label className="errorLabel">{SignInError}</label>
      <label className="errorLabel">{SignInSuccess}</label>
    </div>
  )
}

export default Login