using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Users
{
    public class UserLoginModel
    {
        [StringLength(512)]
        [Required]
        public string Email { get; set; }

        [StringLength(512)]
        [Required]
        public string Password { get; set; }
    }
}
