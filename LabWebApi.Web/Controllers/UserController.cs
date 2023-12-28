using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Services.Services;
using Microsoft.AspNetCore.Mvc;
using LabWebAPI.Contracts.DTO.User;
using System.Security.Claims;
using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.SignalR.Protocol;
using LabWebAPI.Contracts.DTO.AdminPanel;

namespace LabWebApi.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private string UserId => User.FindFirst(ClaimTypes.NameIdentifier).Value;
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var result = await _userService.GetProfileAsync(UserId);
            return Ok(result);
        }


        [HttpPost("avatar")]
        public async Task<IActionResult> UploadAvatar([FromForm] UserUploadImageDTO file)
        {
            await _userService.UploadAvatar(file.Image, UserId);
            return Ok();
        }

        [HttpGet]
        [Route("avatar")]
        public async Task<FileResult> GetImageAsync()
        {
            var file = await _userService.GetUserImageAsync(UserId);
            return File(file.Content, file.ContentType, file.Name);
        }

        [HttpPut("update")]
        public async Task<IActionResult> EditUserProfile([FromBody] ProfileInfoDTO model)
        {
            await _userService.EditUserProfileAsync(model, UserId);
            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUserProfile()
        {
            string id = UserId;
            await _userService.DeleteProfileAsync(id);
            return Ok();
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePasswordProfile([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            await _userService.ChangePasswordProfileAsync(changePasswordDTO, UserId);
            return Ok();
        }
    }
}
