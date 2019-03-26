using OcticonApi.Core.User;
using OcticonApi.Core.Models.User.Login;
using OcticonApi.Utils;
using System;

namespace OcticonApi.Core.Logic.User
{
    public class LoginUser
    {
        private UserService _provider = new UserService();

        public LoginOutputModel Execute(LoginInputModel input)
        {
            var user = _provider.GetUserByEmailAndPassword(input);

            if (user == null)
            {
                return new LoginOutputModel
                {
                    UserType = UserType.None.ToString()
                };
            }

            return new LoginOutputModel
            {
                UserId = user.Id,
                UserType = user.Type.ToString(),
            };
        }
    }
}
