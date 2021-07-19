import { ResponsivePie } from "@nivo/pie";
import React, {
  useContext, useMemo,
} from "react";

import { Card, Col, Row } from "react-bootstrap";
import Styles from "./TotalCard.module.scss";
import { MetaDataContext } from "../../../containers/MetaDataContextProvider";
import useFilteredApi from "../../../hooks/useFilteredApi";
import { TotalsData } from "../../../models/TotalsData";
import PackageType from "../../../models/enums/PackageType";
import formatAvocadoCount from "../../../helpers/formatters";
import { FilterValuesContext } from "../../../containers/FilterValuesContextProvider";

const TotalCard = () => {
  const data = useFilteredApi<TotalsData>(
    "dashboard/totals",
    {} as TotalsData
  );

  const { addPackageType } = useContext(FilterValuesContext);
  const { isReady: isMetaDataReady, metaData } = useContext(MetaDataContext);

  const pieChart = useMemo(() => {
    const formattedData = (isMetaDataReady ?? false) ? [
      {
        id: metaData
          .packageTypeShortNames.find((c) => c.key === PackageType.PLU4046)?.value
          ?? PackageType.PLU4046,
        value: data.plu4046,
      },
      {
        id: metaData
          .packageTypeShortNames.find((c) => c.key === PackageType.PLU4225)?.value
          ?? PackageType.PLU4225,
        value: data.plu4225,
      },
      {
        id: metaData
          .packageTypeShortNames.find((c) => c.key === PackageType.PLU4770)?.value
          ?? PackageType.PLU4770,
        value: data.plu4770,
      },
      {
        id: metaData
          .packageTypeShortNames.find((c) => c.key === PackageType.XLargeBag)?.value
          ?? PackageType.XLargeBag,
        value: data.xLargeBags,
      },
      {
        id: metaData
          .packageTypeShortNames.find((c) => c.key === PackageType.LargeBag)?.value
          ?? PackageType.LargeBag,
        value: data.largeBags,
      },
      {
        id: metaData
          .packageTypeShortNames.find((c) => c.key === PackageType.SmallBag)?.value
          ?? PackageType.SmallBag,
        value: data.smallBags,
      },
    ]
      : [];
    return (
      <ResponsivePie
        data={formattedData}
        margin={{
          top: 15, right: 15, bottom: 15, left: 15,
        }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        onClick={(e) => {
          addPackageType(e.id as string);
        }}
      />

    );
  }, [data, addPackageType, isMetaDataReady, metaData]);

  return (
    <Row>
      <Col sm={12} md={12} lg={8} xl={6} className="pt-4">
        <Card>
          <Card.Body className="d-flex align-items-center">
            <div className="d-flex align-items-center mx-auto">
              <div className={`${Styles.Card}`}>
                {pieChart}
              </div>
              <div className="">
                <h3 className="mb-0">
                  {data.totalVolume === null
                    ? "..."
                    : formatAvocadoCount(data.totalVolume ?? 0)}
                </h3>
                <span className="text-muted">Avocados sold</span>
              </div>
            </div>

          </Card.Body>
        </Card>

      </Col>
      <Col lg={4} md={12} xl={6} className="pt-4">
        <Card>
          <Card.Body className="d-flex align-items-center">
            <div className={`${Styles.PriceCard} d-flex flex-column justify-content-center text-center mx-auto`}>
              <h3 className="mb-0">
                {`$${data.averagePrice?.toFixed(2) ?? "..."}`}
              </h3>
              <span className="text-muted">Average price per avocado</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TotalCard;
