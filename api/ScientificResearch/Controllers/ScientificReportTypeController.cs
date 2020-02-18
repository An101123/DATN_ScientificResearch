using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.ScientificReportTypes;
using ScientificResearch.Core.Business.Services;

namespace ScientificResearch.Controllers
{
    [Route("api/scientificReportType")]
    [ValidateModel]
    public class ScientificReportTypeController : ControllerBase
    {
        private readonly IScientificReportTypeService _scientificReportTypeService;

        public ScientificReportTypeController(IScientificReportTypeService scientificReportTypeService)
        {
            _scientificReportTypeService = scientificReportTypeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var scientificReportType = await _scientificReportTypeService.ListScientificReportTypeAsync(requestListViewModel);
            return Ok(scientificReportType);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScientificReportTypeById(Guid id)
        {
            var scientificReportType = await _scientificReportTypeService.GetScientificReportTypeByIdAsync(id);
            return Ok(scientificReportType);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ScientificReportTypeManageModel scientificReportTypeManageModel)
        {
            var response = await _scientificReportTypeService.CreateScientificReportTypeAsync(scientificReportTypeManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ScientificReportTypeManageModel scientificReportTypeManageModel)
        {
            var response = await _scientificReportTypeService.UpdateScientificReportTypeAsync(id, scientificReportTypeManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _scientificReportTypeService.DeleteScientificReportTypeAsync(id);
            return new CustomActionResult(response);
        }
    }
}
