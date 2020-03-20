using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Lecturers
{
    public class LecturerViewModel
    {
        public LecturerViewModel()
        {

        }
        public LecturerViewModel(Lecturer lecturer) : this()
        {
            if (lecturer != null)
            {
                Id = lecturer.Id;
                Name = lecturer.Name;
                Faculty = lecturer.Faculty;
                DateOfBirth = lecturer.DateOfBirth;
                Total = lecturer.Total;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Faculty { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int Total { get; set; }
    }
}