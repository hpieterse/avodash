import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DataFilter from "../DataFilter/DataFilter";

var Dashboard = () => {
  return (
    <Container>
      <Row>
        <DataFilter />
      </Row>
    </Container>
  );
};

export default Dashboard;
