import React from "react";
import Styles from "./Dashboard.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DataFilter from "../DataFilter/DataFilter";

var Dashboard = () => {
  return (
    <Container>
      <Row>
        <div className={Styles.Heading}>Hello World</div>
        <DataFilter />
      </Row>
    </Container>
  );
};

export default Dashboard;
