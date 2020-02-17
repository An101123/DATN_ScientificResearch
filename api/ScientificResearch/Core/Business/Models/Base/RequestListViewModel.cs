using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Base
{
    public class RequestListViewModel
    {
        public RequestListViewModel()
        {
            IsDesc = false;
        }

        public int? Offset { get; set; }

        public int? Limit { get; set; }

        public string SortName { get; set; }

        public bool IsDesc { get; set; }

        public string Query { get; set; }

        public bool? IsActive { get; set; }
    }
}
