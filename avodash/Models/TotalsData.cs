using System.Text.Json.Serialization;

namespace avodash.Models
{
    public class TotalsData
    {
        public decimal TotalVolume { get; set; }

        [JsonPropertyName("plu4046")]
        public decimal PLU4046 { get; set; }

        [JsonPropertyName("plu4225")]
        public decimal PLU4225 { get; set; }

        [JsonPropertyName("plu4770")]
        public decimal PLU4770 { get; set; }

        public decimal SmallBags { get; set; }

        public decimal LargeBags { get; set; }

        public decimal XLargeBags { get; set; }

        public decimal AveragePrice { get; set; }
    }
}
