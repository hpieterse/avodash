import React from "react";
import Card from "react-bootstrap/Card";
import Styles from "./ChartContainer.module.scss";

const ChartContainer = ({ title, orientation, children }: { title: string, orientation: "vertical" | "horizontal", children: React.ReactNode }) => (
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <div className={`${orientation === "vertical" ? Styles.ChartParentVertical : Styles.ChartParentHorizontal}`}>
        {children}
      </div>
    </Card.Body>
  </Card>
);

export default ChartContainer;
