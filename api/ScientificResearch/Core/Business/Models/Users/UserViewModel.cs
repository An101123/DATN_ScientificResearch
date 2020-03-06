using ScientificResearch.Core.Common.Utilities;
using ScientificResearch.Entities;
using ScientificResearch.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Users
{
    public class UserViewModel
    {
        public UserViewModel()
        {

        }

        public UserViewModel(User user) : this()
        {
            if (user != null)
            {
                Id = user.Id;
                Username = user.Username;
                Password = user.Password;
                FullName = user.FullName;
                Email = user.Email;
                Gender = user.Gender.GetEnumName();
                DateOfBirth = user.DateOfBirth;
            }
        }

        public Guid Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

    }
}
