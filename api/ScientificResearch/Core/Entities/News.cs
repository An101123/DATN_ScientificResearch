using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Entities
{
    public class News : BaseEntity
    {
        public News() : base()
        {

        }
        public string Title { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public string Image { get; set; }
    }
}
