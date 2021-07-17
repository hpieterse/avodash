import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Header = () => {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>Avodash</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
