using System;
using System.Collections.Generic;

namespace OcticonApi.Core.Domain.Repository
{
    public partial class ParkingSpot
    {
        public ParkingSpot()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public int? ParkingId { get; set; }

        public Parking Parking { get; set; }
        public ICollection<Reservation> Reservation { get; set; }
    }
}
