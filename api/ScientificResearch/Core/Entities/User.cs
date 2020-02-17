using ScientificResearch.Entities.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Entities
{
    [Table("User")]
    public class User : BaseEntity
    {
        public User() : base()
        {

        }
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; }

        [StringLength(512)]
        public string AvatarUrl { get; set; }

        [Required]
        public string FullName { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public UserEnums.UserGender? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? ResetPasswordExpiryDate { get; set; }

        public virtual ICollection<ScientificWork> ScientificWorks { get; set; }

        public virtual ICollection<ScientificReport> ScientificReports { get; set; }
    }
}
