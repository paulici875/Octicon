using Microsoft.EntityFrameworkCore;
using OcticonApi.Core.Domain.Repository;
using OcticonApi.Core.Models.Parking;
using OcticonApi.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OcticonApi.Core.Parking
{
    public class ParkingService
    {
        public List<ParkingModel> GetParkings()
        {
            var parkings = new List<ParkingModel>();

            using (var octdb = new OcticonDbContext())
            {
                var currentReservedSpotIds = octdb.Reservation
                    .Where(_ => (DateTime.Compare(_.DateTime, Constants.TwoHEarlier) > 0 && _.ChargingType == ChargingType.Normal.ToString())
                    || (DateTime.Compare(_.DateTime, Constants.OneHEarlier) > 0 && _.ChargingType == ChargingType.Fast.ToString()))
                    .Select(_ => _.ParkingSpotId).ToList();

                var dbParkings = octdb.Parking.Include(_ => _.ParkingSpot).ToList();                
                foreach (var dbParking in dbParkings)
                {
                    var pSpots = dbParking.ParkingSpot.Select(_ => _.Id).ToList();

                    parkings.Add(new ParkingModel
                    {
                        Id = dbParking.Id,
                        Address = dbParking.Address,
                        IsOpen = dbParking.IsOpen,
                        ParkingSpotIds = pSpots,
                        EmptyParkingSpotIds = pSpots.Where(_ => !currentReservedSpotIds.Contains(_)).ToList()
                    }); 
                }
            }
            return parkings;
        }
    }
}
