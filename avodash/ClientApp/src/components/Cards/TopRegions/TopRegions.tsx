import React, { useContext, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FilterValuesContext } from "../../../containers/FilterValuesContextProvider";
import { MetaDataContext } from "../../../containers/MetaDataContextProvider";
import useFilteredApi from "../../../hooks/useFilteredApi";
import { TopRegion } from "../../../models/TopRegion";
import formatAvocadoCount from "../../../helpers/formatters";
import { ReactComponent as FilterSvg } from "../../../svg/filter-light.svg";
import { ReactComponent as MinusSvg } from "../../../svg/minus-solid.svg";
import { ReactComponent as PlusSvg } from "../../../svg/plus-solid.svg";
import { ReactComponent as TimesSvg } from "../../../svg/times-solid.svg";

const TopRegions = ({ className }: { className?: string }) => {
  const data = useFilteredApi<Array<TopRegion>>("/dashboard/top", []);
  const [, metaData] = useContext(MetaDataContext);
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);

  const addRegionFilter = (region: string, exclude: boolean = false) => {
    if (filterValues == null) {
      return;
    }
    if (exclude) {
      setFilterValues({
        ...filterValues,
        excludedRegions: [...filterValues.excludedRegions, region],
      });
    } else {
      setFilterValues({
        ...filterValues,
        regions: [...filterValues.regions, region],
      });
    }
  };

  const removeRegionFilter = (region: string) => {
    if (filterValues == null) {
      return;
    }
    setFilterValues({
      ...filterValues,
      regions: filterValues.regions.filter((c) => c !== region),
      excludedRegions: filterValues.excludedRegions.filter((c) => c !== region),
    });
  };

  return (
    <Card className={className}>
      <Card.Body>
        <Card.Title>Top 10 Regions by Volume</Card.Title>
        <div>
          <ListGroup variant="flush">
            {data.map((topRegion, index) => {
              const isFiltered = filterValues?.regions?.some((r) => r === topRegion.region)
                    === true
                  || filterValues?.excludedRegions?.some(
                    (r) => r === topRegion.region
                  ) === true;

              return (
                <ListGroup.Item key={topRegion.region} className="px-0">
                  <div>
                    <div className="d-flex py-2">
                      <h6 className="me-2">
                        {index + 1}
                        .
                      </h6>
                      <div>
                        <h6>
                          {metaData.regions.find(
                            (r) => r.key === topRegion.region
                          )?.value ?? topRegion.region}
                        </h6>
                        <p className="mb-2">
                          <span>
                            {formatAvocadoCount(topRegion.totalVolume)}
                          </span>
                          <span className="text-muted"> avocados</span>
                        </p>
                        <div>
                          <Button
                            id="add-filter"
                            className="me-2"
                            size="sm"
                            variant={
                              isFiltered ? "primary" : "outline-primary"
                            }
                            onClick={() => (isFiltered
                              ? removeRegionFilter(topRegion.region)
                              : addRegionFilter(topRegion.region))}
                          >
                            {isFiltered ? (
                              <Fragment>
                                <TimesSvg className="icon-small me-1" />
                                <FilterSvg className="icon-small" />
                              </Fragment>
                            ) : (
                              <Fragment>
                                <PlusSvg className="icon-small me-1" />
                                <FilterSvg className="icon-small" />
                              </Fragment>
                            )}
                          </Button>
                          {!isFiltered ? (
                            <Button
                              id="exclude-filter"
                              variant="outline-danger"
                              size="sm"
                              onClick={() => addRegionFilter(topRegion.region, true)}
                            >
                              <MinusSvg className="icon-small me-1" />
                              <FilterSvg className="icon-small" />
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TopRegions;
