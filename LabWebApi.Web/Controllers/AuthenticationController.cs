using LabWebAPI.Contracts.DTO.Authentications;
using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace LabWebApi.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;
        public AuthenticationController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserLoginDTO logDTO)
        {
            var tokens = await authenticationService.LoginAsync(logDTO);
            return Ok(tokens);
        }
        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> RegistrationAsync([FromBody] UserRegistrationDTO regDTO)
        {
            await authenticationService.RegistrationAsync(regDTO);
            return Ok();
        }
        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync([FromBody] UserAutorizationDTO userTokensDTO)
        {
            var tokens = await authenticationService.RefreshTokenAsync(userTokensDTO);
            return Ok(tokens);
        }
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> LogoutAsync([FromBody] UserAutorizationDTO userTokensDTO)
        {
            await authenticationService.LogoutAsync(userTokensDTO);
            return NoContent();
        }
    }
}