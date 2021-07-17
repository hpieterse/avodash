using System;
using System.Collections.Generic;
using avodash.Models.Enums;

namespace avodash.Models
{
    public class FilterQuery
    {
        public IEnumerable<string> Regions { get; set; }
        public IEnumerable<string> ExcludedRegions { get; set; }
        public IEnumerable<PackageType> PackageTypes { get; set; }
        public IEnumerable<ProductionType> ProductionTypes { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}
