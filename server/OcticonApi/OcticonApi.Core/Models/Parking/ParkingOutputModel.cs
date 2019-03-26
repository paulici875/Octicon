using System;

namespace OcticonApi.Core.Models.Parking
{
    public class ParkingOutputModel
    {
        public Int32 Id { get; set; }
        public String Address { get; set; }
        public Boolean IsOpen { get; set; }
        public Int32 EmptySpotsCount { get; set; }
        public Int32 ReservedSpotsCount { get; set; }
    }
}
