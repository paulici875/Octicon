using OcticonApi.Core.Parking;
using OcticonApi.Core.Models.Parking;
using System.Collections.Generic;
using System.Linq;

namespace OcticonApi.Core.Logic.Parking
{
    public class GetParkings
    {
        private ParkingService _provider = new ParkingService();

        public List<ParkingOutputModel> Execute()
        {
            var parkings = _provider.GetParkings();

            var outputModel = parkings.Select(_ => new ParkingOutputModel
            {
                Id = _.Id,
                Address = _.Address,
                IsOpen = _.IsOpen,
                EmptySpotsCount = _.EmptyParkingSpotIds.Count,
                ReservedSpotsCount = _.ParkingSpotIds.Count - _.EmptyParkingSpotIds.Count
            }).OrderBy(_ => !_.IsOpen).ToList();
            
            return outputModel;
        }
    }
}
