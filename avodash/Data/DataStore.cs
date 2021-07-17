using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using avodash.Data.Models;
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
    }
}
