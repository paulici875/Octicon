using System;
using System.Security.Cryptography;
using System.Text;

namespace OcticonApi.Core.Utils
{
    public static class PasswordHelper
    {        
        public static String GenerateHashedPassword(String password)
        {
            using (var sha256 = SHA256.Create())
            {
                return BitConverter.ToString(sha256.ComputeHash(Encoding.UTF8.GetBytes(password))).Replace("-", "");
            }
        }
    }
}
