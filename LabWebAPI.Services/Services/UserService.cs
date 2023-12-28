using AutoMapper;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Exceptions;
using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using LabWebAPI.Contracts.APImodels;
using LabWebAPI.Contracts.Helpers;
using LabWebAPI.Contracts.DTO.AdminPanel;
using LabWebAPI.Contracts.Roles;
using LabWebAPI.Contracts.DTO.User;
using LabWebAPI.Contracts.Data;

namespace LabWebAPI.Services.Services
{
    public class UserService: IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly IRepository<RefreshToken> _refreshTokenRepository;
        private readonly IOptions<ImageSettings> _imageSettings;
        public UserService(UserManager<User> userManager,
        IMapper mapper,
        IFileService fileService,
        IOptions<ImageSettings> imageSettings)
        {
            _userManager = userManager;
            _mapper = mapper;
            _fileService = fileService;
            _imageSettings = imageSettings;
        }
        public async Task<UserInfoDTO> GetProfileAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id) ?? throw new UserNotFoundException("User not found!");
            var model = new UserInfoDTO();
            _mapper.Map(user, model);
            model.Role = Enum.Parse<AuthorizationRoles>(await GetUserRoleAsync(user));
            return model;
        }
        public async Task UploadAvatar(IFormFile avatar, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            string newPath = await _fileService.AddFileAsync(avatar.OpenReadStream(), _imageSettings.Value.Path,
           avatar.FileName);
            if (user.ImageAvatarUrl != null)
            {
                await _fileService.DeleteFileAsync(user.ImageAvatarUrl);
            }
            user.ImageAvatarUrl = newPath;
            await _userManager.UpdateAsync(user);
        }
        public async Task<DownloadFile> GetUserImageAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            _ = user.ImageAvatarUrl ?? throw new NotFoundException("Image not found.");
            var file = await _fileService.GetFileAsync(user.ImageAvatarUrl);
            return file;
        }
        private async Task<string> GetUserRoleAsync(User user)
        {
            return await Task.FromResult(_userManager.GetRolesAsync(user).Result.FirstOrDefault());
        }

        public async Task EditUserProfileAsync(ProfileInfoDTO model, string id)
        {
            var user = await _userManager.FindByIdAsync(id) ?? throw new UserNotFoundException("User not found!");

            var userName = await _userManager.FindByNameAsync(model.UserName);
            if (userName != null && userName.Id != id)
            {
                throw new UserAlreadyExistsException("Username");
            }
            var userEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userEmail != null && userEmail.Id != id)
            {
                throw new UserAlreadyExistsException("Email");
            }

            _mapper.Map(model, user);
            await _userManager.UpdateAsync(user);
    
        }
        public async Task ChangePasswordProfileAsync(ChangePasswordDTO changePasswordDTO, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId) 
                ?? throw new UserNotFoundException("User not found!");
            await _userManager.ChangePasswordAsync(user, changePasswordDTO.CurrentPassword, changePasswordDTO.NewPassword);
        }

        public async Task DeleteProfileAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId) ?? throw new UserNotFoundException("User not found!");
            await _userManager.RemoveFromRoleAsync(user, await GetUserRoleAsync(user));
            await _userManager.DeleteAsync(user);
        }
    }
}
