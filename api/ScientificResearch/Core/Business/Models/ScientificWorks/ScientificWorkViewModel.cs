using ScientificResearch.Core.Business.Models.Lecturers;
using ScientificResearch.Core.Business.Models.Levels;
using ScientificResearch.Core.Business.Models.Users;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.ScientificWorks
{
    public class ScientificWorkViewModel
    {
        public ScientificWorkViewModel()
        {

        }

        public ScientificWorkViewModel(ScientificWork scientificWork) : this()
        {
            if (scientificWork != null)
            {
                Id = scientificWork.Id;
                Name = scientificWork.Name;
                Content = scientificWork.Content;
                Time = scientificWork.Time;
                Level = new LevelViewModel(scientificWork.Level);
                Lecturer = new LecturerViewModel(scientificWork.Lecturer);
                //User = new UserViewModel(scientificWork.User);
                //Lecturer = new LecturerViewModel;
            }
        }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public DateTime Time { get; set; }

        public LevelViewModel Level { get; set; }

        public LecturerViewModel Lecturer { get; set; }

        //public UserViewModel User { get; set; }
    }
}
