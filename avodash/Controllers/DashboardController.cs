using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
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
        public Task<IEnumerable<ChartSeries<int, string, decimal>>> PriceVsTime([FromQuery] FilterQuery filterQuery)
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
                    Id = (int)grouping.Key.ProductionType,
                    Date = grouping.Key.Date,
                    Price = grouping.Average(m => m.AveragePrice),
                })
                .GroupBy(c => c.Id)
                .Select((grouping) => new ChartSeries<int, string, decimal>
                {
                    Id = grouping.Key,
                    Data = grouping.Select(m => new ChartDataPoint<string, decimal>
                    {
                        X = m.Date.ToString("yyyy-MM-dd"),
                        Y = m.Price,
                    })
                });

            return Task.FromResult(data);
        }
    }
}
