import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./logo.svg";

function NavigationBar() {
  return (
    <Navbar bg="success" variant="dark" style={{ marginBottom: "20px" }}>
      <Navbar.Brand>
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <span style={{ fontWeight: "bold" }}> Consulta API React</span>
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">CEP</Nav.Link>
        <Nav.Link href="/github">Github</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
