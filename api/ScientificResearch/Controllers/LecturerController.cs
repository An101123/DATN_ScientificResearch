using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.Lecturers;
using ScientificResearch.Core.Business.Services;

namespace ScientificResearch.Controllers
{
    [Route("api/lecturers")]
    [ValidateModel]
    public class LecturerController : ControllerBase
    {
        private readonly ILecturerService _lecturerService;

        public LecturerController(ILecturerService lecturerService)
        {
            _lecturerService = lecturerService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllLecturer()
        {
            var lecturer = await _lecturerService.GetAllLecturer();
            return Ok(lecturer);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel requestListViewModel)
        {
            var lecturer = await _lecturerService.ListLecturerAsync(requestListViewModel);
            return Ok(lecturer);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLecturerById(Guid id)
        {
            var lecturer = await _lecturerService.GetLecturerByIdAsync(id);
            return Ok(lecturer);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LecturerManageModel lecturerManageModel)
        {
            var response = await _lecturerService.CreateLecturerAsync(lecturerManageModel);
            return new CustomActionResult(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] LecturerManageModel lecturerManageModel)
        {
            var response = await _lecturerService.UpdateLecturerAsync(id, lecturerManageModel);
            return new CustomActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var response = await _lecturerService.DeleteLecturerAsync(id);
            return new CustomActionResult(response);
        }

<<<<<<< HEAD
        [HttpGet("{id}/scientificWorks")]
=======
        [HttpGet("{id}/ScientificWork")]
>>>>>>> 2229926413492dcaf0b783af53d06207bfbb32af
        public async Task<IActionResult> GetAllScientificWorkByLecturerId(Guid id)
        {
            var scientificWorks = await _lecturerService.GetScientificWorkByLecturerIdAsync(id);
            return Ok(scientificWorks);
        }

<<<<<<< HEAD
        [HttpGet("{id}/scientificReports")]
=======
        [HttpGet("{id}/ScientificReport")]
>>>>>>> 2229926413492dcaf0b783af53d06207bfbb32af
        public async Task<IActionResult> GetAllScientificReportByLecturerId(Guid id)
        {
            var scientificReports = await _lecturerService.GetScientificReportByLecturerIdAsync(id);
            return Ok(scientificReports);
        }
    }
}