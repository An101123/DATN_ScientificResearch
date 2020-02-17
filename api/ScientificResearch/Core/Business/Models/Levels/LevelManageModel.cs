using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Levels
{
    public class LevelManageModel : IValidatableObject
    {
        public string Name { get; set; }

        public void GetLevelFromModel(Level level)
        {
            level.Name = Name;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Name.Equals(""))
            {
                yield return new ValidationResult("Level name is required!", new string[] { "Name" });
            }
        }
    }
}
