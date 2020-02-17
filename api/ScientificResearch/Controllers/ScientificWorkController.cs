using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.ScientificWorks;
using ScientificResearch.Core.Business.Services;

namespace ScientificResearch.Controllers
{
    [Route("api/ScientificWork")]
    [ApiController]
    public class ScientificWorkController : ControllerBase
    {
        private readonly IScientificWorkService _scientificWorkService;
        public ScientificWorkController(IScientificWorkService scientificWorkService)
        {
            _scientificWorkService = scientificWorkService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel RequestListViewModel)
        {
            var scientificWork = await _scientificWorkService.ListScientificWorkAsync(RequestListViewModel);
            return Ok(scientificWork);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScientificWorkById(Guid id)
        {
            var level = await _scientificWorkService.GetScientificWorkByIdAsync(id);
            return Ok(level);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ScientificWorkManageModel scientificWorkManagerModel)
        {
            var response = await _scientificWorkService.CreateScientificWorkAsync(scientificWorkManagerModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ScientificWorkManageModel scientificWorkManageModel)
        {
            var response = await _scientificWorkService.UpdateScientificWorkAsync(id, scientificWorkManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _scientificWorkService.DeleteScientificWorkAsync(id);
            return new CustomActionResult(responseModel);
        }
    }
}