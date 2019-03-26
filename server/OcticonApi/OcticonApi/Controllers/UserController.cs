using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OcticonApi.Core.Logic.User;
using OcticonApi.Core.Models.User;
using OcticonApi.Core.Models.User.Login;
using System;

namespace OcticonApi.Controllers
{
    public class UserController : Controller
    {
        //
        // Summary:
        //     Search for a user by email and password
        //
        // Parameters: 
        //     Json format: email and password
        //
        // Returns:
        //     String: a UserType: Admin, Client or None (if user is not found)
        //
        [HttpPost("/login")]
        public LoginOutputModel Login([FromBody]LoginInputModel input)
        {
            return new LoginUser().Execute(input);
        }

        //
        // Summary:
        //     Search for a user profile
        //
        // Returns:
        //     Json: user id, first and last name, user type, email, phone, 
        //      number of active and total reservations
        //
        [HttpGet("/[controller]/profile/{userId}")]
        public UserProfileOutputModel UserProfile(Int32 userId)
        {
            return new GetUserProfile().Execute(userId);
        }

        //
        // Summary:
        //     Search for a user profile
        //
        // Parameters:
        //     Json: old and new passord
        //
        [HttpPost("/change-password")]
        public Int32 ChangeUserPassword([FromBody]ChangePasswordInputModel input)
        {
            new ChangePassword().Execute(input);
            return 200;
        }
    }
}
