using System.Collections.Generic;
using avodash.Data.Models;

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
    }
}
