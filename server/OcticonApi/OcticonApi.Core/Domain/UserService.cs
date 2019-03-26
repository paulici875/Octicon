using OcticonApi.Core.Models.User.Login;
using OcticonApi.Core.Models.User;
using OcticonApi.Core.Utils;
using System.Linq;
using OcticonApi.Core.Domain.Repository;
using System;

namespace OcticonApi.Core.User
{
    public class UserService
    {
        public UserModel GetUserByEmailAndPassword(LoginInputModel input)
        {
            var password = PasswordHelper.GenerateHashedPassword(input.Password);

            UserInfo user;
            using (var octdb = new OcticonDbContext())
            {
                user = octdb.UserInfo.FirstOrDefault(_ => _.Email == input.Email && _.Password == password);
            }

            return user != null ? UserModel.FromDbModel(user) : null;
        }

        public UserModel GetUserById(Int32 userId)
        {
            UserInfo user;
            using (var octdb = new OcticonDbContext())
            {
                user = octdb.UserInfo.FirstOrDefault(_ => _.Id == userId );
            }

            return user != null ? UserModel.FromDbModel(user) : null;
        }

        public void ChangePassword(ChangePasswordInputModel input)
        {
            using (var octdb = new OcticonDbContext())
            {
                var oldPassword = PasswordHelper.GenerateHashedPassword(input.OldPassword);
                var newPassword = PasswordHelper.GenerateHashedPassword(input.NewPassword);

                var user = octdb.UserInfo.FirstOrDefault(_ => _.Id == input.UserId && _.Password == oldPassword);
                if(user != null)
                {
                    user.Password = newPassword;
                    octdb.SaveChanges();
                }
            }
        }
    }
}
