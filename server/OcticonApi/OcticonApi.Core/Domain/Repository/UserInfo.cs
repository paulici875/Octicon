using System;
using System.Collections.Generic;

namespace OcticonApi.Core.Domain.Repository
{
    public partial class UserInfo
    {
        public UserInfo()
        {
            Reservation = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public string Type { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }

        public ICollection<Reservation> Reservation { get; set; }
    }
}
