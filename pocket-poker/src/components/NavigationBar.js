import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown component
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';

function NavigationBar() {
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
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Log In/Sign Up
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item href="/Login">Log In</Dropdown.Item>
                <Dropdown.Item href="/Signup">Sign Up</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;