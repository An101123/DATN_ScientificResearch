using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.News_s;
using ScientificResearch.Core.Business.Services;

namespace ScientificResearch.Controllers
{
    [Route("api/news")]
    [ValidateModel]

    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var news = await _newsService.ListNewsAsync(requestListViewModel);
            return Ok(news);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(Guid id)
        {
            var level = await _newsService.GetNewsByIdAsync(id);
            return Ok(level);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] NewsManageModel newsManageModel)
        {
            var response = await _newsService.CreateNewsAsync(newsManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _newsService.DeleteNewsAsync(id);
            return new CustomActionResult(response);
        }
    }


}