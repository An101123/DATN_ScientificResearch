using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.ScientificReportTypes
{
    public class ScientificReportTypeViewModel
    {
        public ScientificReportTypeViewModel()
        {

        }

        public ScientificReportTypeViewModel(ScientificReportType scientificReportType) : this()
        {
            if (scientificReportType != null)
            {
                Id = scientificReportType.Id;
                Name = scientificReportType.Name;
                Score = scientificReportType.Score;
            }
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public int Score { get; set; }
    }
}
