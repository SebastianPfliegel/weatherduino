using System;

namespace serialapi.Models
{
    public class SensorValues
    {
        public double temperature { get; set; }
        public double humidity { get; set; }
        public DateTime lastUpdate { get; set; }
    }
}