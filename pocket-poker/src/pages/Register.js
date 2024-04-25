import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s");
const Register = (props) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordconfirm, setPasswordconfirm] = useState('')
  const [emailError, setEmailError] = useState('')
  const [nameError, setnameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = async() => {
    // You'll update this function later...
    if(email.indexOf("@") === -1 || email.indexOf('.') === -1) {
        setEmailError("Error: not a valid email address")
        return;
    }
    if(password !== passwordconfirm) {
        setPasswordError("Error: Passwords do not match")
        return;
    }
    if(password.length <= 5 || passwordconfirm.length <= 5) {
        setPasswordError("Error: Password must be at least 6 characters.")
        return;
    }

    setPasswordError("")
    setEmailError("")
    setUsernameError("")
    const  { data, error } = await supabase.auth.signUp({
        'email': email,
        'password': password,
        options: {
          data: {
          'name': name,
          'username' :username
        }
      }
    })
    console.log(data)
  }

 
  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          //type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your first and last name here"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel" >{nameError}</label>
      </div>
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your Username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel" >{usernameError}</label>
      </div>

      <br />
      <div className={'inputContainer'}>
        <input
          type = 'password'
          value={password}
          placeholder="Enter your password here with at least 6 characters"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <div className={'inputContainer'}>
        <input
          type = 'password'
          value={passwordconfirm}
          placeholder="Confirm your password here"
          onChange={(ev) => setPasswordconfirm(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel" style={{fontSize: 20 + 'px'}}>{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign in'} />
      </div>
    </div>
  )
}

export default Register