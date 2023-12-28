using LabWebAPI.Contracts.DTO.AdminPanel.Product;

namespace LabWebAPI.Contracts.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductInfoDTO>> GetAllProductsAsync();
        Task<ProductInfoDTO> GetProductByIdAsync(int id);
        Task<ProductInfoDTO> EditProductAsync(UpdateProductDTO model, string userId, int id);
        Task DeleteProductAsync(int id, string userId);
        Task<ProductInfoDTO> CreateProductAsync(CreateProductDTO model, string userId);
    }
}
