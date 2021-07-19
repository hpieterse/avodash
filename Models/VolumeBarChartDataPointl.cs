using System.Text.Json.Serialization;

namespace avodash.Models
{
    public class VolumeBarChartDataPoint
    {
        public string PriceRange { get; set; }

        [JsonPropertyName("PLU 4046")]
        public decimal PLU4046 { get; set; }

        [JsonPropertyName("PLU 4225")]
        public decimal PLU4225 { get; set; }

        [JsonPropertyName("PLU 4770")]
        public decimal PLU4770 { get; set; }

        [JsonPropertyName("Small Bag")]
        public decimal SmallBags { get; set; }

        [JsonPropertyName("Large Bag")]
        public decimal LargeBags { get; set; }

        [JsonPropertyName("X-Large Bag")]
        public decimal XLargeBags { get; set; }
    }
}
