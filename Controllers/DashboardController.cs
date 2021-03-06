using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using avodash.Data;
using avodash.Models;
using avodash.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace avodash.Controllers
{
    [ApiController]
    public class DashboardController : ControllerBase
    {

        private readonly IDataStore _dataStore;

        public DashboardController(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        [HttpGet]
        [Route("[controller]/top")]
        public Task<IEnumerable<TopRegion>> TopRegions([FromQuery] FilterQuery filterQuery)
        {
            var filterOnPackageType = filterQuery.PackageTypes?.Any() ?? false;
            var includeLargeBag = filterQuery.PackageTypes?.Any(c => c == PackageType.LargeBag) ?? false;
            var includePLU4046 = filterQuery.PackageTypes?.Any(c => c == PackageType.PLU4046) ?? false;
            var includePLU4225 = filterQuery.PackageTypes?.Any(c => c == PackageType.PLU4225) ?? false;
            var includePLU4770 = filterQuery.PackageTypes?.Any(c => c == PackageType.PLU4770) ?? false;
            var includeSmallBag = filterQuery.PackageTypes?.Any(c => c == PackageType.SmallBag) ?? false;
            var includeXLargeBag = filterQuery.PackageTypes?.Any(c => c == PackageType.XLargeBag) ?? false;

            var topRegions = _dataStore.FilteredData(filterQuery)
                .GroupBy(measurement => measurement.Region)
                .Select((grouping) => new TopRegion
                {
                    Region = grouping.Key,
                    TotalVolume =
                        !filterOnPackageType
                            ? grouping.Sum(m => m.TotalVolume)
                            : grouping.Sum(m =>
                                (includeLargeBag ? m.LargeBags : 0)
                                + (includePLU4046 ? m.PLU4046 : 0)
                                + (includePLU4225 ? m.PLU4225 : 0)
                                + (includePLU4770 ? m.PLU4770 : 0)
                                + (includeSmallBag ? m.SmallBags : 0)
                                + (includeXLargeBag ? m.XLargeBags : 0)),
                    AveragePrice = grouping.Average(m => m.AveragePrice)
                })
                .OrderByDescending(c => c.TotalVolume)
                .Take(10);

            return Task.FromResult(topRegions);
        }

        [HttpGet]
        [Route("[controller]/price-v-time")]
        public Task<IEnumerable<ChartSeries<string, string, decimal>>> PriceVsTime([FromQuery] FilterQuery filterQuery)
        {
            var data = _dataStore.FilteredData(filterQuery)
                .OrderBy(c => c.Date)
                .GroupBy(measurement => new
                {
                    measurement.ProductionType,
                    measurement.Date
                })
                .Select((grouping) => new
                {
                    Id = grouping.Key.ProductionType,
                    Date = grouping.Key.Date,
                    Price = grouping.Average(m => m.AveragePrice),
                })
                .GroupBy(c => c.Id)
                .Select((grouping) => new ChartSeries<string, string, decimal>
                {
                    Id = grouping.Key.GetName(),
                    Data = grouping.Select(m => new ChartDataPoint<string, decimal>
                    {
                        X = m.Date.ToString("yyyy-MM-dd"),
                        Y = m.Price,
                    })
                });

            return Task.FromResult(data);
        }

        [HttpGet]
        [Route("[controller]/volume-v-time")]
        public Task<ChartMetaData<IEnumerable<ChartSeries<string, string, decimal>>>> VolumeVsTime([FromQuery] FilterQuery filterQuery)
        {
            var filterOnPackageType = filterQuery.PackageTypes?.Any() ?? false;
            var includePLU4770 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4770);
            var includePLU4046 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4046);
            var includePLU4225 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4225);
            var includeSmallBag = filterQuery.IsPackageTypeIncluded(PackageType.SmallBag);
            var includeLargeBag = filterQuery.IsPackageTypeIncluded(PackageType.LargeBag);
            var includeXLargeBag = filterQuery.IsPackageTypeIncluded(PackageType.XLargeBag);

            var data = _dataStore.FilteredData(filterQuery)
                .OrderBy(c => c.Date)
                .GroupBy(measurement => new
                {
                    measurement.ProductionType,
                    measurement.Date
                })
                .Select((grouping) => new
                {
                    Id = grouping.Key.ProductionType,
                    Date = grouping.Key.Date,
                    TotalVolume =
                        !filterOnPackageType
                            ? grouping.Sum(m => m.TotalVolume)
                            : grouping.Sum(m =>
                                (includeLargeBag ? m.LargeBags : 0)
                                + (includePLU4046 ? m.PLU4046 : 0)
                                + (includePLU4225 ? m.PLU4225 : 0)
                                + (includePLU4770 ? m.PLU4770 : 0)
                                + (includeSmallBag ? m.SmallBags : 0)
                                + (includeXLargeBag ? m.XLargeBags : 0)),
                })
                .GroupBy(c => c.Id)
                .Select((grouping) => new ChartSeries<string, string, decimal>
                {
                    Id = grouping.Key.GetName(),
                    Data = grouping.Select(m => new ChartDataPoint<string, decimal>
                    {
                        X = m.Date.ToString("yyyy-MM-dd"),
                        Y = m.TotalVolume,
                    })
                });

            var maxValue = data.Count() == 0 ? 0 : data.SelectMany(s => s.Data.Select(d => d.Y)).Max();

            var divisor = maxValue switch
            {
                > 1000000000 => 1000000000, //billioon
                > 1000000 => 1000000,//million
                > 1000 => 1000,//thousands
                _ => 1,
            };

            return Task.FromResult(new ChartMetaData<IEnumerable<ChartSeries<string, string, decimal>>>
            {
                Data = data.Select(s => new ChartSeries<string, string, decimal>
                {
                    Id = s.Id,
                    Data = s.Data.Select(d => new ChartDataPoint<string, decimal>
                    {
                        X = d.X,
                        Y = d.Y / divisor,
                    })
                }),
                ValueDivisor = divisor,
            });
        }

        [HttpGet]
        [Route("[controller]/volume-v-price")]
        public Task<ChartMetaData<IEnumerable<VolumeBarChartDataPoint>>> VolumeVsPrice([FromQuery] FilterQuery filterQuery)
        {
            var includePLU4770 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4770);
            var includePLU4046 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4046);
            var includePLU4225 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4225);
            var includeSmallBag = filterQuery.IsPackageTypeIncluded(PackageType.SmallBag);
            var includeLargeBag = filterQuery.IsPackageTypeIncluded(PackageType.LargeBag);
            var includeXLargeBag = filterQuery.IsPackageTypeIncluded(PackageType.XLargeBag);

            var data = _dataStore.FilteredData(filterQuery)
                .OrderBy(m => m.AveragePrice)
                .GroupBy(m => PriceToBin(m.AveragePrice))
                .Select((grouping, index) =>
                        new VolumeBarChartDataPoint
                        {
                            PriceRange = $"${grouping.Key} to ${grouping.Key + (decimal)0.5}",
                            PLU4770 = includePLU4770 ? grouping.Sum(c => c.PLU4770) : 0,
                            PLU4046 = includePLU4046 ? grouping.Sum(c => c.PLU4046) : 0,
                            PLU4225 = includePLU4225 ? grouping.Sum(c => c.PLU4225) : 0,
                            XLargeBags = includeXLargeBag ? grouping.Sum(c => c.XLargeBags) : 0,
                            LargeBags = includeLargeBag ? grouping.Sum(c => c.LargeBags) : 0,
                            SmallBags = includeSmallBag ? grouping.Sum(c => c.SmallBags) : 0,
                        });


            var maxValue = data.Count() == 0 ? 0 : data.Max(c =>
                c.PLU4046 + c.PLU4225 + c.PLU4770
                + c.SmallBags + c.LargeBags + c.XLargeBags);

            var subtractor = maxValue switch
            {
                > 1000000000 => 1000000000, //billioon
                > 1000000 => 1000000,//million
                > 1000 => 1000,//thousands
                _ => 1,
            };
            return Task.FromResult(new ChartMetaData<IEnumerable<VolumeBarChartDataPoint>>
            {
                Data = data.Select(c => new VolumeBarChartDataPoint
                {
                    XLargeBags = Math.Round(c.XLargeBags / subtractor, 2),
                    LargeBags = Math.Round(c.LargeBags / subtractor, 2),
                    SmallBags = Math.Round(c.SmallBags / subtractor, 2),
                    PLU4770 = Math.Round(c.PLU4770 / subtractor, 2),
                    PLU4046 = Math.Round(c.PLU4046 / subtractor, 2),
                    PLU4225 = Math.Round(c.PLU4225 / subtractor, 2),
                    PriceRange = c.PriceRange,
                }),
                ValueDivisor = subtractor,
            });
        }

        [HttpGet]
        [Route("[controller]/totals")]
        public Task<TotalsData> Totals([FromQuery] FilterQuery filterQuery)
        {
            var includePLU4770 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4770);
            var includePLU4046 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4046);
            var includePLU4225 = filterQuery.IsPackageTypeIncluded(PackageType.PLU4225);
            var includeSmallBag = filterQuery.IsPackageTypeIncluded(PackageType.SmallBag);
            var includeLargeBag = filterQuery.IsPackageTypeIncluded(PackageType.LargeBag);
            var includeXLargeBag = filterQuery.IsPackageTypeIncluded(PackageType.XLargeBag);

            var filteredData = _dataStore.FilteredData(filterQuery);
            var data = filteredData
                .Aggregate(new TotalsData { }, (acc, measurement) =>
                {
                    acc.AveragePrice += measurement.AveragePrice;
                    acc.XLargeBags += includeXLargeBag ? measurement.XLargeBags : 0;
                    acc.LargeBags += includeLargeBag ? measurement.LargeBags : 0;
                    acc.SmallBags += includeSmallBag ? measurement.SmallBags : 0;
                    acc.PLU4046 += includePLU4046 ? measurement.PLU4046 : 0;
                    acc.PLU4225 += includePLU4225 ? measurement.PLU4225 : 0;
                    acc.PLU4770 += includePLU4770 ? measurement.PLU4770 : 0;
                    acc.TotalVolume += measurement.TotalVolume;
                    return acc;
                }, acc =>
                {
                    acc.AveragePrice /= (filteredData.Count() == 0 ? 1 : filteredData.Count());
                    return acc;
                });
            return Task.FromResult(data);
        }

        private decimal PriceToBin(decimal price)
        {
            var check = (decimal)0;
            var binSize = (decimal)0.5;
            var max = 10;
            do
            {
                if (price < check + binSize)
                {
                    return check;
                }

                check += binSize;
            } while (check < max);

            return max;
        }
    }
}
