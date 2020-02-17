using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Entities
{
    public class Lecturer : BaseEntity
    {
        public Lecturer() : base()
        {

        }

        [Required]
        public string Name { get; set; }

        public string ScientificWorkName { get; set; }

        public string ScientificReportName { get; set; }

        [Required]
        public int Total { get; set; }
        public virtual ICollection<ScientificWork> ScientificWorks { get; set; }

        public virtual ICollection<ScientificReport> ScientificReports { get; set; }
    }
}
