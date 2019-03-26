using OcticonApi.Core.Models.User;
using OcticonApi.Core.User;

namespace OcticonApi.Core.Logic.User
{
    public class ChangePassword
    {
        private UserService _userService = new UserService();

        public void Execute(ChangePasswordInputModel input)
        {
            _userService.ChangePassword(input);
        }
    }
}
