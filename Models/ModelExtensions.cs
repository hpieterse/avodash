using System;
using System.Linq;
using avodash.Models.Enums;

namespace avodash.Models
{
    public static class ModelExtensions
    {
        public static bool IsPackageTypeIncluded(this FilterQuery filterQuery, PackageType packageType) 
        {
            var filterOnPackageType = filterQuery.PackageTypes?.Any() ?? false;
            return !filterOnPackageType || (filterQuery.PackageTypes?.Any(c => c == packageType) ?? false);
        }
    }
}
