using System.Collections.Generic;
using avodash.Data.Models;
using avodash.Models;

namespace avodash.Data
{
    public interface IDataStore
    {
        /// <summary>
        /// Load data into memory
        /// </summary>
        public void Initialise();

        /// <summary>
        /// Public getter with Enumerable to prevent data manipulation
        /// </summary>
        public IEnumerable<AvocadoMeasurement> Data { get; }

        /// <summary>
        /// Get filtered data based on the filters. This does not filter on packaging type
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public IEnumerable<AvocadoMeasurement> FilteredData(FilterQuery filter);
    }
}
