using AutoMapper;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.AdminPanel;
using LabWebAPI.Contracts.Exceptions;
using LabWebAPI.Contracts.Roles;
using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Services.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AdminService(IMapper mapper,
        UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async Task DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id) ?? throw new UserNotFoundException("User not found!");
            await _userManager.RemoveFromRoleAsync(user, await GetUserRoleAsync(user));
            await _userManager.DeleteAsync(user);
        }
        public async Task<UserInfoDTO> EditUserAsync(UserInfoDTO model)
        {
            var user = await _userManager.FindByIdAsync(model.Id) ?? throw new UserNotFoundException("User not found!");
           
            var userName = await _userManager.FindByNameAsync(model.UserName);
            if (userName != null && userName.Id != model.Id)
            {
                throw new UserAlreadyExistsException("Username");
            }
            var userEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userEmail != null && userEmail.Id != model.Id)
            {
                throw new UserAlreadyExistsException("Email");
            }
            var changedRole = await _roleManager.FindByNameAsync(Enum.GetName(model.Role)) ?? throw new
           RoleNotFoundException();
            _mapper.Map(model, user);
            await _userManager.UpdateAsync(user);
            var userRole = Enum.Parse<AuthorizationRoles>(await GetUserRoleAsync(user));
            if (model.Role != userRole)
            {
                await _userManager.RemoveFromRoleAsync(user, userRole.ToString());
                await _userManager.AddToRoleAsync(user, changedRole.Name);
            }
            return model;
        }
        public async Task<UserInfoDTO> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id) ?? throw new UserNotFoundException("User not found!");
            var model = new UserInfoDTO();
            _mapper.Map(user, model);
            model.Role = Enum.Parse<AuthorizationRoles>(await GetUserRoleAsync(user));
            return model;
        }
        public async Task<IEnumerable<UserInfoDTO>> GetUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            Console.WriteLine("IRWEYHWBFUENOMJP,KCSDFLMTU");
            var usersInfo = users.Select(user =>
            {
                var role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();
                return new UserInfoDTO()
                {
                    Id = user.Id,
                    Name = user.Name,
                    UserName = user.UserName,
                    Email = user.Email,
                    Surname = user.Surname,
                    Birthday = user.Birthday,
                    Role = Enum.Parse<AuthorizationRoles>(role)
                };
            })
            .ToList();
            return usersInfo;
        }
        private async Task<string> GetUserRoleAsync(User user)
        {
            return await Task.FromResult(_userManager.GetRolesAsync(user).Result.FirstOrDefault());
        }
    }

}
