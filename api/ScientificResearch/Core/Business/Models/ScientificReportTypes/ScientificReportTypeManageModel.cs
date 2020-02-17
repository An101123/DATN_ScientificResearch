using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.ScientificReportTypes
{
    public class ScientificReportTypeManageModel : IValidatableObject
    {
        public string Name { get; set; }

        public void GetScientificReportTypeFromModel(ScientificReportType scientificReportType)
        {
            scientificReportType.Name = Name;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Name.Equals(""))
            {
                yield return new ValidationResult("ScientificReportType name is required!", new string[] { "Name" });
            }
        }
    }
}
