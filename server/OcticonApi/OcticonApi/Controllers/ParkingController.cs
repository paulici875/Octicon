using Microsoft.AspNetCore.Mvc;
using OcticonApi.Core.Logic.Parking;
using OcticonApi.Core.Models.Parking;
using System.Collections.Generic;

namespace OcticonApi.Controllers
{
    public class ParkingController
    {
        //
        // Summary:
        //     Gets all parkings
        //
        // Returns:
        //     Json format: List of parking models starting with the open ones
        //      - each parking has id, address, isOpen flag, number of emptySpots and number of reservedSpots
        [HttpGet("/[controller]/all")]
        public List<ParkingOutputModel> GetParkings()
        {
            return new GetParkings().Execute();
        }
    }
}
