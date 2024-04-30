import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown component
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import { createClient } from "@supabase/supabase-js"
const supabase = createClient("https://hplnxayyijxebyklpoiz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbG54YXl5aWp4ZWJ5a2xwb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTQyMjcsImV4cCI6MjAyNDk5MDIyN30.8XJMoHKCQp_dWVaK1p73HtUQlGWWEz2hu-nAi7gNr8s")

function NavigationBar() {
  const [userSession, setUserSession] = useState(null)
  const [user, setUser] = useState(null)
  const [logoutStatus, setLogoutStatus] = useState('')

  // Fetches user data to change the sign in / sign out dropdown
  const onButtonHover = async() => {
    // You'll update this function later...
    const {session} = supabase.auth.getSession()
    const { data: { user }, error } = await supabase.auth.getUser()
    try {
      if(error) {
        console.log(error)
      }
      if(user){
        setUser(user)
      } else {
        setUser(null)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const onLogoutButtonClick = async() => {
     const {error} = await supabase.auth.signOut() 
     if(!error) {
      setLogoutStatus('You are now logged off. Thanks for playing.')
     }
  }
  return (
    
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <ul className='nav-li'>
              <li><Nav.Link href="/">Home</Nav.Link></li>
              <li><Nav.Link href="/SB">SB</Nav.Link></li>
              <li><Nav.Link href="/Report">Report</Nav.Link></li>
            </ul>
            {/* Use Dropdown component instead of NavDropdown */}
            <Dropdown>
              <Dropdown.Toggle onMouseEnter={onButtonHover} variant="secondary" id="dropdown-basic">
                { user ? 'Logout' : 'Log In/Sign Up' }
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
               { !user && <Dropdown.Item href="/login">Log In</Dropdown.Item> }
               { !user && <Dropdown.Item href="/Register">Sign Up</Dropdown.Item> }
               { user &&  <Dropdown.Item onClick={onLogoutButtonClick}>Sign Out</Dropdown.Item> }
              </Dropdown.Menu>
            </Dropdown>
            <label className="errorLabel">&nbsp;{logoutStatus}</label>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;