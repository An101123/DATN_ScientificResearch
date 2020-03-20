using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.DataAccess.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Filters
{
    public class CustomActionResult: IActionResult
    {
        private readonly ResponseModel _response;

        public CustomActionResult(ResponseModel response)
        {
            _response = response;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            ObjectResult objectResult;
            switch (_response.StatusCode)
            {
                case System.Net.HttpStatusCode.OK:
                    objectResult = new ObjectResult(_response.Data)
                    {
                        StatusCode = (int)_response.StatusCode
                    };
                    break;

                default:
                    objectResult = new ObjectResult(_response.Message)
                    {
                        StatusCode = (int)_response.StatusCode
                    };
                    break;
            }
            await objectResult.ExecuteResultAsync(context);
        }
    }
}
