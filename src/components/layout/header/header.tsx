import React from 'react';
// import { AppBar, Container, Typography, Toolbar} from '@mui/material';
import { Navbar, Container, Nav } from 'react-bootstrap'

type HeaderProps = {
  isDark: boolean;
}

const Header = function(props: HeaderProps) {
  return (
    <Navbar bg={props.isDark ? "dark" : "primary"} variant={props.isDark ? "dark" : "light"} expand="lg">
      <Container>
        <Navbar.Brand>Solution For Weather</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
