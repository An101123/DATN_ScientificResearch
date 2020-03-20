using ScientificResearch.Core.Business.IoC;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Lecturers
{
    public class LecturerManageModel : IValidatableObject
    {
        public string Name { get; set; }
        public string Faculty { get; set; }
        public DateTime DateOfBirth { get; set; }
        public void GetLecturerFromModel(Lecturer lecturer)
        {
            lecturer.Name = Name;
            lecturer.Faculty = Faculty;
            lecturer.DateOfBirth = DateOfBirth;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validation)
        {
            if (string.IsNullOrEmpty(Name))
            {
                yield return new ValidationResult("Name is required!", new string[] { "Name" });
            }
        }

    }
}
