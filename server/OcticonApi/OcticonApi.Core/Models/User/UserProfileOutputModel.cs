using System;

namespace OcticonApi.Core.Models.User
{
    public class UserProfileOutputModel
    {
        public String Type { get; set; }
        public String LastName { get; set; }
        public String FirstName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }

        public Int32 NumberOfActiveReservations { get; set; }
        public Int32 NumberOfTotalReservations { get; set; }

        public UserProfileOutputModel(UserModel user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Phone = user.Phone;
            Type = user.Type.ToString();
        }
    }
}
