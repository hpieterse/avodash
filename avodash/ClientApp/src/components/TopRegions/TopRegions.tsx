import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import useFilteredApi from "../../hooks/useFilteredApi";
import { TopRegion } from "../../models/topRegion";
import { formatAvocadoCount } from "../../helpers/formatters";

const TopRegions = ({ className }: { className?: string }) => {
  const [dataReady, data] = useFilteredApi<Array<TopRegion>>("/dashboard/top");
  const [isMetaDataReady, metaData] = useContext(MetaDataContext);
  const [filterValues, setFilterValues] = useContext(FilterValuesContext);

  const isReady = dataReady && isMetaDataReady;

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
        <Card.Title>Top Volume Regions</Card.Title>
        <div>
          {isReady === false ? (
            <span>...Loading</span>
          ) : (
            <ListGroup variant="flush">
              {data.map((topRegion, index) => {
                const isFiltered =
                  filterValues?.regions?.some((r) => r === topRegion.region) ===
                    true ||
                  filterValues?.excludedRegions?.some(
                    (r) => r === topRegion.region
                  ) === true;

                return (
                  <ListGroup.Item key={topRegion.region} className="px-0">
                    <div>
                      <div className="d-flex py-2">
                        <h6 className="me-2">{index + 1}.</h6>
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
                              type="checkbox"
                              size="sm"
                              variant={
                                isFiltered ? "primary" : "outline-primary"
                              }
                              onClick={(e) =>
                                isFiltered
                                  ? removeRegionFilter(topRegion.region)
                                  : addRegionFilter(topRegion.region)
                              }
                            >
                              {isFiltered ? "Remove Filter" : "Filter"}
                            </Button>
                            {!isFiltered ? (
                              <Button
                                id="exclude-filter"
                                type="checkbox"
                                variant="outline-danger"
                                size="sm"
                                onClick={(e) =>
                                  addRegionFilter(topRegion.region, true)
                                }
                              >
                                Exclude Region
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
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TopRegions;
