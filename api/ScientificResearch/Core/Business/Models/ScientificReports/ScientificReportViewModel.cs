using ScientificResearch.Core.Business.Models.Lecturers;
using ScientificResearch.Core.Business.Models.ScientificReportTypes;
using ScientificResearch.Core.Business.Models.Users;
using ScientificResearch.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.ScientificReports
{
    public class ScientificReportViewModel
    {
        public ScientificReportViewModel()
        {

        }

        public ScientificReportViewModel(ScientificReport scientificReport) : this()
        {
            if (scientificReport != null)
            {
                Id = scientificReport.Id;
                Name = scientificReport.Name;
                Content = scientificReport.Content;
                ScientificReportType = new ScientificReportTypeViewModel(scientificReport.ScientificReportType);
                Lecturer = new LecturerViewModel(scientificReport.Lecturer);
                User = new UserViewModel(scientificReport.User);
            }
        }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Content { get; set; }

        public ScientificReportTypeViewModel ScientificReportType { get; set; }

        public LecturerViewModel Lecturer { get; set; }

        public UserViewModel User { get; set; }

    }
}
