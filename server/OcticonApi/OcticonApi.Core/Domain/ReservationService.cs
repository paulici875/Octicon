using OcticonApi.Core.Domain.Repository;
using OcticonApi.Core.Models.Reservations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OcticonApi.Core.Domain
{
    public class ReservationService
    {
        public List<ReservationModel> GetReservationsByUserId(Int32 userId)
        {
            List<ReservationModel> reservations;
            using (var octdb = new OcticonDbContext())
            {
                reservations = octdb.Reservation.Where(_ => _.UserId == userId).Select(_ => ReservationModel.FromDBModel(_)).ToList();
            }
            return reservations != null ? reservations : new List<ReservationModel>();
        }
    }
}
