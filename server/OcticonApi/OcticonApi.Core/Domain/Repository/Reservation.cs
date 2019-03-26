using System;

namespace OcticonApi.Core.Domain.Repository
{
    public partial class Reservation
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ParkingSpotId { get; set; }
        public string LicencePlate { get; set; }
        public string ChargingType { get; set; }
        public string ReservationType { get; set; }
        public DateTime DateTime { get; set; }

        public ParkingSpot ParkingSpot { get; set; }
        public UserInfo User { get; set; }
    }
}
