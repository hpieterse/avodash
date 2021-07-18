import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Styles from "./Header.module.scss";
import { ReactComponent as LogoSvg } from "../../svg/logo.svg";

const Header = () => (
  <Navbar bg="light">
    <Container>
      <Navbar.Brand className="d-flex align-items-center fw-bold">
        <LogoSvg className={Styles.Logo} />
        {" "}
        Avodash
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
