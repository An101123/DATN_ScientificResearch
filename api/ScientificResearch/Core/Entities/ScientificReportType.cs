using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Entities
{
    public class ScientificReportType : BaseEntity
    {
        public ScientificReportType() : base()
        {

        }
        public string Name { get; set; }

        public int Score { get; set; }

        public virtual ICollection<ScientificReport> ScientificReports { get; set; }

    }
}
