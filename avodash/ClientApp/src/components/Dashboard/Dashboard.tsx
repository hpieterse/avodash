import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DataFilter from "../DataFilter/DataFilter";
import TopRegions from "../TopRegions/TopRegions";

var Dashboard = () => {
  return (
    <Container>
      <Row>
        <DataFilter />
      </Row>
      <Row>
        <TopRegions />
      </Row>
    </Container>
  );
};

export default Dashboard;
