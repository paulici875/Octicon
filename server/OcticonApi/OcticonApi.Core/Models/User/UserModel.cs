using OcticonApi.Core.Domain.Repository;
using OcticonApi.Utils;
using System;

namespace OcticonApi.Core.Models.User
{
    public class UserModel
    {
        public Int32 Id { get; set; }
        public UserType Type { get; set; }
        public String LastName { get; set; }
        public String FirstName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }

        public static UserModel FromDbModel(UserInfo user)
        {
            return new UserModel
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Type = (UserType)Enum.Parse(typeof(UserType), user.Type, true)
            };
        }
    }
}
