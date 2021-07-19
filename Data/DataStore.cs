using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using avodash.Data.Models;
using avodash.Models;
using avodash.Models.Enums;

namespace avodash.Data
{
    public class DataStore : IDataStore
    {
        private List<AvocadoMeasurement> _data;

        /// <inheritdoc/>
        public void Initialise()
        {
            var lines = File.ReadLines("Data/avocado.csv");

            _data = new List<AvocadoMeasurement>();

            foreach (var line in lines.Skip(1))
            {
                var lineCells = line.Split(',');
                var measurement = new AvocadoMeasurement()
                {
                    Date = DateTime.Parse(lineCells[1]),
                    AveragePrice = decimal.Parse(lineCells[2]),
                    TotalVolume = decimal.Parse(lineCells[3]),
                    PLU4046 = decimal.Parse(lineCells[4]),
                    PLU4225 = decimal.Parse(lineCells[5]),
                    PLU4770 = decimal.Parse(lineCells[6]),
                    TotalBags = decimal.Parse(lineCells[7]),
                    SmallBags = decimal.Parse(lineCells[8]),
                    LargeBags = decimal.Parse(lineCells[9]),
                    XLargeBags = decimal.Parse(lineCells[10]),
                    ProductionType = lineCells[11] == "conventional" ? ProductionType.Conventional : ProductionType.Organic,
                    Year = int.Parse(lineCells[12]),
                    Region = lineCells[13],
                };

                _data.Add(measurement);
            }
        }

        /// <inheritdoc/>
        public IEnumerable<AvocadoMeasurement> Data { get { return _data; } }

        /// <inheritdoc/>
        public IEnumerable<AvocadoMeasurement> FilteredData(FilterQuery filterQuery)
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
            var excludeRegions = filterQuery.ExcludedRegions?.Any() ?? false;

            return Data.Where(m => (!filterStartDate || m.Date >= filterQuery.StartDate)
                    && (!filterEndDate || m.Date <= filterQuery.EndDate)
                    && (!filterRegions || filterQuery.Regions.Any(r => r == m.Region))
                    && (!filterProductionTypes || filterQuery.ProductionTypes.Any(p => p == m.ProductionType))
                    && (!excludeRegions || filterQuery.ExcludedRegions.All(r => r != m.Region))
                );
        }
    }
}
