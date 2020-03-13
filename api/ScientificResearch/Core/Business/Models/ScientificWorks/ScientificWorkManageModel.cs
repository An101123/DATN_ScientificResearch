using ScientificResearch.Core.Business.IoC;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.ScientificWorks
{
    public class ScientificWorkManageModel : IValidatableObject
    {
        public string Name { get; set; }

        public string Content { get; set; }

        public Guid LevelId { get; set; }

        public Guid LecturerId { get; set; }

        public DateTime Time { get; set; }

        //public Guid UserId { get; set; }

        public void GetScientificWorkFromModel(ScientificWork scientificWork)
        {
            scientificWork.Name = Name;
            scientificWork.Content = Content;
            scientificWork.LevelId = LevelId;
            scientificWork.LecturerId = LecturerId;
            scientificWork.Time = Time;
            //scientificWork.UserId = UserId;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validation)
        {
            if (string.IsNullOrEmpty(Name))
            {
                yield return new ValidationResult("Name is required!", new string[] { "Name" });
            }
            if (LevelId == Guid.Empty)
            {
                yield return new ValidationResult("Level is required!", new string[] { "LevelId" });
            }
            var levelRepository = IoCHelper.GetInstance<IRepository<Level>>();
            var level = levelRepository.GetAll().FirstOrDefault(x => x.Id == LevelId);
            if (level == null)
            {
                yield return new ValidationResult("Level is not found!", new string[] { "LevelId" });
            }
            if (LecturerId == Guid.Empty)
            {
                yield return new ValidationResult("Lecturer is required!", new string[] { "LecturerId" });
            }
            var lecturerRepository = IoCHelper.GetInstance<IRepository<Lecturer>>();
            var lecturer = lecturerRepository.GetAll().FirstOrDefault(x => x.Id == LecturerId);
            if (lecturer == null)
            {
                yield return new ValidationResult("Lecturer is not found!");
            }
        }

    }
}
