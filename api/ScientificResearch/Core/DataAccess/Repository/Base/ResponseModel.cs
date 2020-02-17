using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ScientificResearch.Core.DataAccess.Repository.Base
{
    public class ResponseModel
    {
        public HttpStatusCode StatusCode { get; set; }

        public object Data { get; set; }

        public string Message { get; set; }
    }
}
