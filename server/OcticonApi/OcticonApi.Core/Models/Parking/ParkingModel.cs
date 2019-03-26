using System;
using System.Collections.Generic;

namespace OcticonApi.Core.Models.Parking
{
    public class ParkingModel
    {
        public Int32 Id { get; set; }
        public String Address { get; set; }
        public Boolean IsOpen { get; set; }
        public List<Int32> ParkingSpotIds { get; set; }
        public List<Int32> EmptyParkingSpotIds { get; set; }
    }
}
