import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataFilter from "../DataFilter/DataFilter";
import TopRegions from "../Cards/TopRegions/TopRegions";
import PriceOverTimeChart from "../Cards/PriceOverTimeChart/PriceOverTimeChart";
import VolumeOverTimeChart from "../Cards/VolumeOverTimeChart/VolumeOverTimeChart";
import VolumeVsPriceChart from "../Cards/VolumeVsPriceChart/VolumeVsPriceChart";
import ChartContainer from "../../containers/ChartContainer/ChartContainer";
import TotalCard from "../Cards/TotalCard/TotalCard";

const Dashboard = () => (
  <Container className="pb-5">
    <Row className="pt-5">
      <DataFilter />
    </Row>
    <Row>
      <Col xs={6} lg={8} xl={9}>
        <Row>
          <Col xs={12}>
            <TotalCard />
          </Col>
          <Col xs={12} className="pt-5">
            <ChartContainer orientation="horizontal" title="Average Price per Avocado">
              <PriceOverTimeChart />
            </ChartContainer>
          </Col>
          <Col xs={12} className="pt-5">
            <ChartContainer orientation="horizontal" title="Total Volume">
              <VolumeOverTimeChart />
            </ChartContainer>
          </Col>
          <Col xs={12} className="pt-5">
            <ChartContainer orientation="vertical" title="Volume vs Price">
              <VolumeVsPriceChart />
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
