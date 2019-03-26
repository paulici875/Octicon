using OcticonApi.Core.User;
using System.Linq;
using OcticonApi.Core.Models.User;
using System;
using OcticonApi.Core.Domain;
using OcticonApi.Core.Utils;

namespace OcticonApi.Core.Logic.User
{
    public class GetUserProfile
    {
        private UserService _userService = new UserService();
        private ReservationService _reservationService = new ReservationService();

        public UserProfileOutputModel Execute(Int32 userId)
        {
            var user = _userService.GetUserById(userId);
            var reservations = _reservationService.GetReservationsByUserId(user.Id);

            var userProfile = new UserProfileOutputModel(user);
            userProfile.NumberOfTotalReservations = reservations.Count;
            userProfile.NumberOfActiveReservations = reservations
                .Count(_ => (DateTime.Compare(_.StartDateTime, Constants.TwoHEarlier) > 0 && _.ChargingType == ChargingType.Normal)
                    || (DateTime.Compare(_.StartDateTime, Constants.OneHEarlier) > 0 && _.ChargingType == ChargingType.Fast));
            
            return userProfile;
        }
    }
}
