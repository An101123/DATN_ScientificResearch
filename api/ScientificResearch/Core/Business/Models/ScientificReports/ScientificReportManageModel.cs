using ScientificResearch.Core.Business.IoC;
using ScientificResearch.Core.DataAccess.Repository.Base;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.ScientificReports
{
    public class ScientificReportManageModel : IValidatableObject
    {
        public string Name { get; set; }

        public string Content { get; set; }

        public Guid ScientificReportTypeId { get; set; }

        public void GetScientificWorkFromModel(ScientificReport scientificReport)
        {
            scientificReport.Name = Name;
            scientificReport.Content = Content;
            scientificReport.ScientificReportTypeId = ScientificReportTypeId;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validation)
        {
            if (Name.Equals(""))
            {
                yield return new ValidationResult("Name is required!", new string[] { "Name" });
            }
            if (ScientificReportTypeId == null)
            {
                yield return new ValidationResult("ScientificReport is required!", new string[] { "ScientificReportTypeId" });
            }
            var scientificReportRepository = IoCHelper.GetInstance<IRepository<Level>>();
            var scientificReport = scientificReportRepository.GetAll().FirstOrDefault(x => x.Id == ScientificReportTypeId);
            if (scientificReport == null)
            {
                yield return new ValidationResult("ScientificReport is not found!", new string[] { "ScientificReportTypeId" });
            }
        }
    }
}
