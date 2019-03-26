using OcticonApi.Core.Domain.Repository;
using OcticonApi.Core.Utils;
using System;

namespace OcticonApi.Core.Models.Reservations
{
    public class ReservationModel
    {
        public Int32 Id { get; set; }
        public Int32 UserId { get; set; }
        public Int32 ParkingSpotId { get; set; }
        public String LicencePlate { get; set; }
        public ChargingType ChargingType { get; set; }
        public ReservationType ReservationType { get; set; }
        public DateTime StartDateTime { get; set; }

        public static ReservationModel FromDBModel(Reservation reservation)
        {
            return new ReservationModel
            {
                Id = reservation.Id,
                UserId = reservation.UserId.Value,
                ParkingSpotId = reservation.ParkingSpotId.Value,
                LicencePlate = reservation.LicencePlate,
                ChargingType = (ChargingType)Enum.Parse(typeof(ChargingType), reservation.ChargingType, true),
                ReservationType = (ReservationType)Enum.Parse(typeof(ReservationType), reservation.ReservationType, true),
                StartDateTime = reservation.DateTime
            };
        }
    }
}
