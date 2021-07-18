import React from "react";
import Card from "react-bootstrap/Card";
import Styles from "./ChartContainer.module.scss";

const ChartContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <div className={Styles.ChartParent}>
        {children}
      </div>
    </Card.Body>
  </Card>
);

export default ChartContainer;
