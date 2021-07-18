using System;
namespace avodash.Models
{
    public class ChartDataPoint<Tx, Ty>
    {
        public Tx X { get; set; }
        public Ty Y { get; set; }
    }
}
