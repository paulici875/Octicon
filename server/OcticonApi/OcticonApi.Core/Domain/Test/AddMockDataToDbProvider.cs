using OcticonApi.Core.Domain.Repository;
using OcticonApi.Core.Utils;
using OcticonApi.Utils;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OcticonApi.Domain.Test
{
    public class AddMockDataToDbProvider
    {
        private List<UserInfo> _users;
        private List<Parking> _parkings;
        private List<ParkingSpot> _pSpots;

        public void AddMockData()
        {
            _SaveUserInfo();
            _SaveParkingInfo();
            _SaveParkingSpotInfo();
        }

        private void _SaveUserInfo()
        {
            var user1 = new UserInfo
            {
                FirstName = "Diana",
                LastName = "Ciocan",
                Type = UserType.Admin.ToString(),
                Email = "diana@ciocan.com",
                Phone = "(041)654-7898",
                Password = PasswordHelper.GenerateHashedPassword("123456")
            };
            var user2 = new UserInfo
            {
                FirstName = "Some",
                LastName = "Client",
                Type = UserType.Client.ToString(),
                Email = "some@client.com",
                Phone = "(075)112-6655",
                Password = PasswordHelper.GenerateHashedPassword("123456")
            };

            _users = new List<UserInfo> { user1, user2 };

            using (var octdb = new OcticonDbContext())
            {
                octdb.UserInfo.AddRange(_users);
                octdb.SaveChanges();
            }
        }

        private void _SaveParkingInfo()
        {
            _parkings = new List<Parking> {
                new Parking { IsOpen = true, Address = "593 Macey Branch" },
                new Parking { IsOpen = false, Address = "197 Bauch Path" },
                new Parking { IsOpen = true, Address = "06956 Jodie Ways" },
                new Parking { IsOpen = false, Address = "7518 Bauch Way" },
                new Parking { IsOpen = true, Address = "100 Fredrick Harbors" },
                new Parking { IsOpen = false, Address = "927 Berenice Lodge" },
                new Parking { IsOpen = true, Address = "36096 Lurline Ridge" },
                new Parking { IsOpen = true, Address = "266 Kiel Parkways" },
                new Parking { IsOpen = false, Address = "97586 Zander Causeway" },
                new Parking { IsOpen = true, Address = "3454 Mina Meadows" }
            };

            using (var octdb = new OcticonDbContext())
            {
                octdb.Parking.AddRange(_parkings);
                octdb.SaveChanges();
            }
        }

        private void _SaveParkingSpotInfo()
        {
            _pSpots = new List<ParkingSpot>();
            using (var octdb = new OcticonDbContext())
            {
                _parkings = octdb.Parking.ToList();
                for (var i = 1; i <= 100; i++)
                {
                    _pSpots.Add(new ParkingSpot { ParkingId = _parkings[new Random().Next(10)].Id });
                }

                octdb.ParkingSpot.AddRange(_pSpots);
                octdb.SaveChanges();
            }
        }
    }
}