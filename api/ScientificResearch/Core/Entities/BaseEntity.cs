using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Entities
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            Id = Guid.NewGuid();
            CreateOn = DateTime.UtcNow;
            RecordDeleted = false;
            RecordActive = true;
        }

        [Key]
        public Guid Id { get; set; }

        public int RecordOrder { get; set; }

        public bool RecordDeleted { get; set; }

        public bool RecordActive { get; set; }

        public DateTime? CreateOn { get; set; }

        public Guid? CreateBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public Guid? UpdatedBy { get; set; }

        public Guid? DeletedBy { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
