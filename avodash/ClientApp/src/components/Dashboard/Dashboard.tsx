import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataFilter from "../DataFilter/DataFilter";
import TopRegions from "../TopRegions/TopRegions";
import PriceOverTimeChart from "../PriceOverTimeChart/PriceOverTimeChart";

const Dashboard = () => (
  <Container>
    <Row className="pt-5">
      <DataFilter />
    </Row>
    <Row className="pt-5">
      <Col xs={6} lg={8} xl={9}>
        <div style={{ height: "400px" }}>
          <PriceOverTimeChart />
        </div>
      </Col>
      <Col xs={6} lg={4} xl={3}>
        <TopRegions />
      </Col>
    </Row>
  </Container>
);

export default Dashboard;
