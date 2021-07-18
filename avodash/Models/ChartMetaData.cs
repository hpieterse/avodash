namespace avodash.Models
{
    public class ChartMetaData<TChartData>
    {
        /// <summary>
        /// The value used as a divisor from all value properties. Used when the values
        /// are too larg to make sense of.
        /// </summary>
        public int ValueDivisor { get; set; }
        public TChartData Data { get; set; }
    }
}
