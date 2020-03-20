using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Entities
{
    public class ScientificReport : BaseEntity
    {
        public ScientificReport() : base()
        {

        }
        public string Name { get; set; }

        public string Content { get; set; }

        public DateTime Time { get; set; }

        public Guid ScientificReportTypeId { get; set; }
        public virtual ScientificReportType ScientificReportType { get; set; }

        public Guid LecturerId { get; set; }
        public virtual Lecturer Lecturer { get; set; }

        //public Guid UserId { get; set; }
        //public virtual User User { get; set; }



    }
}
