using System;
using avodash.Models.Enums;

namespace avodash.Data.Models
{
    public class AvocadoMeasurement
    {
        public DateTime Date { get; set; }
        public decimal AveragePrice { get; set; }
        public decimal TotalVolume { get; set; }
        public decimal PLU4046 { get; set; }
        public decimal PLU4225 { get; set; }
        public decimal PLU4770 { get; set; }
        public decimal TotalBags { get; set; }
        public decimal SmallBags { get; set; }
        public decimal LargeBags { get; set; }
        public decimal XLargeBags { get; set; }
        public ProductionType ProductionType { get; set; }
        public int Year { get; set; }
        public string Region { get; set; }
    }
}
