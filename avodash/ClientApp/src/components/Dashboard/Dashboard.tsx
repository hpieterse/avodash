import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataFilter from "../DataFilter/DataFilter";
import TopRegions from "../TopRegions/TopRegions";
import PriceOverTimeChart from "../PriceOverTimeChart/PriceOverTimeChart";
import ChartContainer from "../../containers/ChartContainer/ChartContainer";

const Dashboard = () => (
  <Container>
    <Row className="pt-5">
      <DataFilter />
    </Row>
    <Row>
      <Col xs={6} lg={8} xl={9}>
        <Row>
          <Col xs={6} xl={4} className="pt-5">
            <ChartContainer title="Average Price p Avocado">
              <PriceOverTimeChart />
            </ChartContainer>
          </Col>
          <Col xs={6} xl={4} className="pt-5">
            <ChartContainer title="Average Price p Avocado">
              <PriceOverTimeChart />
            </ChartContainer>
          </Col>
          <Col xs={6} xl={4} className="pt-5">
            <ChartContainer title="Average Price p Avocado">
              <PriceOverTimeChart />
            </ChartContainer>
          </Col>
        </Row>
      </Col>

      <Col xs={6} lg={4} xl={3} className="pt-5">
        <TopRegions />
      </Col>
    </Row>
  </Container>
);

export default Dashboard;
