using ScientificResearch.Entities;
using ScientificResearch.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Users
{
    public class UserViewDetailModel
    {
        public UserViewDetailModel()
        {

        }

        public UserViewDetailModel(User user) : this()
        {
            if (user != null)
            {
                Id = user.Id;
                Username = user.Username;
                FullName = user.FullName;
                Email = user.Email;
                Gender = user.Gender;
                DateOfBirth = user.DateOfBirth;
            }
        }
        public Guid Id { get; set; }

        public string Username { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public UserEnums.UserGender? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        //public RoleViewModel[] Roles { get; set; }
    }
}
