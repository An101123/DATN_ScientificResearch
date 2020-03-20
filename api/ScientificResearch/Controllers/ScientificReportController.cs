using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.ScientificReports;
using ScientificResearch.Core.Business.Services;

namespace ScientificResearch.Controllers
{
    [Route("api/scientificReports")]
    [ValidateModel]
    public class ScientificReportController : ControllerBase
    {
        private readonly IScientificReportService _scientificReportService;
        public ScientificReportController(IScientificReportService scientificReportService)
        {
            _scientificReportService = scientificReportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel RequestListViewModel)
        {
            var scientificReport = await _scientificReportService.ListScientificReportAsync(RequestListViewModel);
            return Ok(scientificReport);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScientificReportById(Guid id)
        {
            var level = await _scientificReportService.GetScientificReportByIdAsync(id);
            return Ok(level);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ScientificReportManageModel scientificReportManagerModel)
        {
            var response = await _scientificReportService.CreateScientificReportAsync(scientificReportManagerModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ScientificReportManageModel scientificReportManageModel)
        {
            var response = await _scientificReportService.UpdateScientificReportAsync(id, scientificReportManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _scientificReportService.DeleteScientificReportAsync(id);
            return new CustomActionResult(responseModel);
        }
    }
}