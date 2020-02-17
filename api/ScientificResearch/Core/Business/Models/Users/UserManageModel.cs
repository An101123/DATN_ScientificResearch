using ScientificResearch.Core.Business.IoC;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using ScientificResearch.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Users
{
    public class UserManageModel
    {
        public string Username { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(32)]
        public string FullName { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public UserEnums.UserGender? Gender { get; set; }

        public void SetUserModel(User user)
        {
            user.Username = Username;
            user.FullName = FullName;
            user.Email = Email;
            user.Password = Password;
            user.DateOfBirth = DateOfBirth;
            user.Gender = Gender;
        }
    }
}
