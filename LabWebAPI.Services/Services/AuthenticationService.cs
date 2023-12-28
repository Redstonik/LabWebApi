using AutoMapper;
using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.Authentications;
using LabWebAPI.Contracts.Exceptions;
using LabWebAPI.Contracts.Services;
using LabWebAPI.Services.Validators;
using Microsoft.AspNetCore.Identity;
using System.Text;
namespace LabWebAPI.Services.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IJwtService _jwtService;
        private readonly IRepository<RefreshToken> _refreshTokenRepository;
        private readonly IMapper _mapper;
        public AuthenticationService(UserManager<User> userManager,
        IJwtService jwtService,
        IRepository<RefreshToken> refreshTokenRepository,
        IMapper mapper,
        RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _refreshTokenRepository = refreshTokenRepository;
            _mapper = mapper;
            _roleManager = roleManager;
        }
        public async Task<UserAutorizationDTO> LoginAsync(UserLoginDTO model)
        {

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                throw new InvalidLoginException();
            }
            if (user != null)
            {
                return await GenerateUserTokenAsync(user);
            }
            return new UserAutorizationDTO() { IsAuthenticated = false };
        }
        private async Task<UserAutorizationDTO> GenerateUserTokenAsync(User user)
        {
            var claims = _jwtService.SetClaims(user);
            var token = _jwtService.CreateToken(claims);
            var refeshToken = await CreateRefreshTokenAsync(user);
            var tokens = new UserAutorizationDTO()
            {
                Token = token,
                RefreshToken = refeshToken,
                IsAuthenticated = true
            };
            return tokens;
        }
        private async Task<string> CreateRefreshTokenAsync(User user)
        {
            var refeshToken = _jwtService.CreateRefreshToken();
            RefreshToken rt = new RefreshToken()
            {
                Token = refeshToken,
                UserId = user.Id
            };
            await _refreshTokenRepository.AddAsync(rt);
            await _refreshTokenRepository.SaveChangesAsync();
            return refeshToken;
        }
        public async Task LogoutAsync(UserAutorizationDTO userTokensDTO)
        {
            var refeshTokenFromDb = _refreshTokenRepository.Query()
            .FirstOrDefault(x => x.Token == userTokensDTO.RefreshToken);
            if (refeshTokenFromDb == null)
            {
                return;
            }
            await _refreshTokenRepository.DeleteAsync(refeshTokenFromDb);
            await _refreshTokenRepository.SaveChangesAsync();
        }
        public async Task<UserAutorizationDTO> RefreshTokenAsync(UserAutorizationDTO userTokensDTO)
        {
            var refeshTokenFromDb = _refreshTokenRepository.Query()
            .FirstOrDefault(x => x.Token == userTokensDTO.RefreshToken);

            if (refeshTokenFromDb == null)
            {
                throw new Exception();
            }
            var claims = _jwtService.GetClaimsFromExpiredToken(userTokensDTO.Token);
            var newToken = _jwtService.CreateToken(claims);
            var newRefreshToken = _jwtService.CreateRefreshToken();
            refeshTokenFromDb.Token = newRefreshToken;
            await _refreshTokenRepository.UpdateAsync(refeshTokenFromDb);
            await _refreshTokenRepository.SaveChangesAsync();
            var tokens = new UserAutorizationDTO()
            {
                Token = newToken,
                RefreshToken = newRefreshToken
            };
            return tokens;
        }
        public async Task RegistrationAsync(UserRegistrationDTO model)
        {
            if (await Validator.IsUniqueUserName(_userManager, model.UserName))
            {
                throw new UserAlreadyExistsException("Username");
            }
            if (!await Validator.IsUserEmailUnique(_userManager, model.Email))
            {
                throw new UserAlreadyExistsException("Email");
            }
            if (await Validator.IsSystemRoleAndNoAdmin(_roleManager, model.Role))
            {
                throw new RoleNotFoundException();
            }
            var user = new User();
            _mapper.Map(model, user);
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                StringBuilder errorMessage = new StringBuilder();
                foreach (var error in result.Errors)
                {
                    errorMessage.Append(error.Description.ToString() + " ");
                }
                throw new BadRequestException(errorMessage.ToString());
            }
            await _userManager.AddToRoleAsync(user, Enum.GetName(model.Role));
        }
    }
}
