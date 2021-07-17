import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { FilterValuesContext } from "../../containers/FilterValuesContextProvider";
import { MetaDataContext } from "../../containers/MetaDataContextProvider";
import useFilteredApi from "../../hooks/useFilteredApi";
import { TopRegion } from "../../models/topRegion";

const TopRegions = () => {
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
    <>
      <h1>Top Regions</h1>
      {isReady === false ? (
        <span>...Loading</span>
      ) : (
        <div>
          {data.map((topRegion) => {
            const isFiltered =
              filterValues?.regions?.some((r) => r === topRegion.region) ===
                true ||
              filterValues?.excludedRegions?.some(
                (r) => r === topRegion.region
              ) === true;

            return (
              <div key={topRegion.region}>
                <h3>
                  {metaData.regions.find((r) => r.key === topRegion.region)
                    ?.value ?? topRegion.region}
                </h3>
                <p>R {topRegion.averagePrice}</p>
                <p>{topRegion.totalVolume} tn</p>
                {
                  <div>
                    <Button
                      id="toggle-check"
                      type="checkbox"
                      variant={isFiltered ? "primary" : "outline-primary"}
                      onClick={(e) =>
                        isFiltered
                          ? removeRegionFilter(topRegion.region)
                          : addRegionFilter(topRegion.region)
                      }
                    >
                      {isFiltered ? "Remove Filter" : "Add Filter"}
                    </Button>
                    {!isFiltered ? (
                      <Button
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-danger"
                        onClick={(e) => addRegionFilter(topRegion.region, true)}
                      >
                        Exclude Region
                      </Button>
                    ) : null}
                  </div>
                }
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TopRegions;
