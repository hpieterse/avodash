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

            var filterRegions = filterQuery.Regions?.Any() ?? false;
            var filterProductionTypes = filterQuery.ProductionTypes?.Any() ?? false;

            var filterStartDate = filterQuery.StartDate != null;
            var filterEndDate = filterQuery.EndDate != null;

            var topRegionQuery1 = _dataStore.Data
                .Where(m => (!filterStartDate || m.Date >= filterQuery.StartDate)
                    && (!filterEndDate || m.Date <= filterQuery.EndDate)
                    && (!filterRegions || filterQuery.Regions.Any(r => r == m.Region))
                    && (!filterProductionTypes || filterQuery.ProductionTypes.Any(p => p == m.ProductionType))
                );
            var q2 = topRegionQuery1.GroupBy(measurement => measurement.Region)
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
                });
            var topRegions = q2.OrderByDescending(c => c.TotalVolume)
                .Take(10);

            return Task.FromResult(topRegions);
        }
    }
}
