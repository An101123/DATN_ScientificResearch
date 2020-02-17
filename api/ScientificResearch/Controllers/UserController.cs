using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ScientificResearch.Core.Business.Filters;
using ScientificResearch.Core.Business.Models.Base;
using ScientificResearch.Core.Business.Models.Users;
using ScientificResearch.Core.Business.Services;

namespace ScientificResearch.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        //private readonly IEmailService _emailService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        #region GET

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RequestListViewModel userRequestListViewModel)
        {
            var users = await _userService.ListUserAsync(userRequestListViewModel);
            return Ok(users);
        }

        [HttpGet("{id}")]
        //[CustomAuthorize]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpGet("email/{email}")]
        //[CustomAuthorize]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            return Ok(user);
        }

        #endregion

        #region POST

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserManageModel userManageModel)
        {
            var responseModel = await _userService.RegisterAsync(userManageModel);
            return new CustomActionResult(responseModel);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginModel userLoginModel)
        {
            var responseModel = await _userService.LoginAsync(userLoginModel);
            return new CustomActionResult(responseModel);
        }

        #endregion

        #region PUT

        [HttpPut("{id}")]
        //[CustomAuthorize]
        public async Task<IActionResult> Put(Guid id, [FromBody] UserManageModel userManageModel)
        {
            var responseModel = await _userService.UpdateProfileAsync(id, userManageModel);
            return new CustomActionResult(responseModel);
        }

        #endregion

        #region DELETE

        [HttpDelete("{id}")]
        //[CustomAuthorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var responseModel = await _userService.DeleteUserAsync(id);
            return new CustomActionResult(responseModel);
        }

        #endregion

        #region Other Methods

        #endregion
    }
}