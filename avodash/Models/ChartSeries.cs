using System.Collections.Generic;

namespace avodash.Models
{
    public class ChartSeries<TId, Tx, Ty>
    {
        public TId Id { get; set; }
        public IEnumerable<ChartDataPoint<Tx, Ty>> Data { get; set; }
    }
}
