using System;
using System.Collections.Generic;

namespace OcticonApi.Core.Domain.Repository
{
    public partial class Parking
    {
        public Parking()
        {
            ParkingSpot = new HashSet<ParkingSpot>();
        }

        public int Id { get; set; }
        public bool IsOpen { get; set; }
        public string Address { get; set; }

        public ICollection<ParkingSpot> ParkingSpot { get; set; }
    }
}
