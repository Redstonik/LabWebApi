using LabWebAPI.Contracts.DTO.Authentications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Services
{
    public interface IAuthenticationService
    {
        Task RegistrationAsync(UserRegistrationDTO model);
        Task<UserAutorizationDTO> LoginAsync(UserLoginDTO model);
        Task<UserAutorizationDTO> RefreshTokenAsync(UserAutorizationDTO userTokensDTO);
        Task LogoutAsync(UserAutorizationDTO userTokensDTO);
    }
}
