using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Models.Base
{
    public class ApiBaseModel
    {
        public ApiBaseModel()
        {

        }
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
