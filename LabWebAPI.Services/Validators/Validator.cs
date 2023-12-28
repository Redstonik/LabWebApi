using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Roles;
using LabWebAPI.Services.Services;
using Microsoft.AspNetCore.Identity;
namespace LabWebAPI.Services.Validators
{
    public static class Validator
    {
        public static async Task<bool> IsUserEmailUnique(UserManager<User> manager, string email)
        {
            return await manager.FindByEmailAsync(email) == null;
        }
        public static async Task<bool> IsUniqueUserName(UserManager<User> manager, string username)
        {
            return await manager.FindByNameAsync(username) != null;
        }
        public static async Task<bool> IsSystemRoleAndNoAdmin(RoleManager<IdentityRole> manager,
        AuthorizationRoles role)
        {
            return role == AuthorizationRoles.Admin ||
            await manager.FindByNameAsync(Enum.GetName(role)) == null;
        }

        public static async Task<bool> IsUnigueProduct(IRepository<Product> repository, string name)
        {
            var products =  await repository.GetAllAsync();
            return products.FirstOrDefault(product=> product.Name == name) != null;
        }

        public static async Task<bool> IsOwnerOrAdmin(IRepository<Product> repository, int productId, string userId)
        {
            var product = await repository.GetByKeyAsync(productId);
            return product.UserWhoCreatedId != userId;
        }
    }
}