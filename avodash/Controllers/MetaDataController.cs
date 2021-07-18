using System;
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
    public class MetaDataController : ControllerBase
    {

        private readonly IDataStore _dataStore;

        public MetaDataController(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        [HttpGet]
        [Route("[controller]")]
        public Task<MetaData> Get()
        {
            var metaData = new MetaData
            {
                MaxDate = _dataStore.Data.Max(c => c.Date),
                MinDate = _dataStore.Data.Min(c => c.Date),
                Regions = _dataStore.Data
                    .Select(measurement => measurement.Region).Distinct()
                    .ToDictionary(
                        regionValue => regionValue,
                        // create display name for region (camel case to words)
                        regionValue => Regex.Replace(regionValue, "([a-z](?=[A-Z])|[A-Z](?=[A-Z][a-z]))", "$1 ")),

                PackageTypes = Enum.GetValues(typeof(PackageType))
                    .Cast<PackageType>()
                    .ToList()
                    .ToDictionary(
                        packageType => (int)packageType,
                        // get display name from attributes
                        packageType => packageType.GetName()),
                PackageTypeShortNames = Enum.GetValues(typeof(PackageType))
                    .Cast<PackageType>()
                    .ToList()
                    .ToDictionary(
                        packageType => (int)packageType,
                        // get display name from attributes
                        packageType => packageType.GetShortName()),

                ProductionTypes = Enum.GetValues(typeof(ProductionType))
                   .Cast<ProductionType>()
                   .ToList()
                   .ToDictionary(
                       packageType => (int)packageType,
                       packageType => packageType.ToString())
            };

            return Task.FromResult(metaData);
        }
    }
}
