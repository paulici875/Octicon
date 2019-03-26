using System;

namespace OcticonApi.Core.Models.User
{
    public class ChangePasswordInputModel
    {
        public Int32 UserId { get; set; }
        public String OldPassword { get; set; }
        public String NewPassword { get; set; }
    }
}
