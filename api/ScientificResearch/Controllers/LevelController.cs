using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.Levels;
using ScientificResearch.Core.Business.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/levels")]
    [ValidateModel]
    public class LevelController : ControllerBase
    {
        private readonly ILevelService _levelService;

        public LevelController(ILevelService levelService)
        {
            _levelService = levelService;
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetAllLevel()
        {
            var level = await _levelService.GetAllLevel();
            return Ok(level);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var level = await _levelService.ListLevelAsync(requestListViewModel);
            return Ok(level);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLevelById(Guid id)
        {
            var level = await _levelService.GetLevelByIdAsync(id);
            return Ok(level);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LevelManageModel levelManageModel)
        {
            var response = await _levelService.CreateLevelAsync(levelManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] LevelManageModel levelManageModel)
        {
            var response = await _levelService.UpdateLevelAsync(id, levelManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _levelService.DeleteLevelAsync(id);
            return new CustomActionResult(response);
        }
    }
}
