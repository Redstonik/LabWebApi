using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using LabWebAPI.Contracts.DTO.AdminPanel.Product;
using LabWebAPI.Contracts.Exceptions;
using LabWebAPI.Services.Validators;

namespace LabWebAPI.Services.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Comment> _commentRepository;
        private readonly IAdminService _adminService;
        private readonly UserManager<User> _userManager;
       
        public ProductService(IMapper mapper, 
            IRepository<Product> productRepository, 
            IAdminService adminService, 
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _adminService = adminService;
            _userManager = userManager;
        }

        public async Task<IEnumerable<ProductInfoDTO>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();
            var productsInfo = products.Select(product =>
            {
                var user = _adminService.GetUserByIdAsync(product.UserWhoCreatedId).Result;
                return new ProductInfoDTO()
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    PublicationDate = product.PublicationDate,
                    UserWhoCreated = user,
                };
            })
           .ToList();
            return productsInfo;
        }

        public async Task<ProductInfoDTO> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetByKeyAsync(id)
                ?? throw new ProductNotFoundException("Product not found!");
            var model = new ProductInfoDTO();
            _mapper.Map(product, model);
            var user = _adminService.GetUserByIdAsync(product.UserWhoCreatedId).Result;
            model.UserWhoCreated = user;
            return model;
        }

        public async Task<ProductInfoDTO> EditProductAsync(UpdateProductDTO model, string userId, int id)
        {
            var product = await _productRepository.GetByKeyAsync(id)
                ?? throw new ProductNotFoundException("Product not found!");

            if (await Validator.IsOwnerOrAdmin(_productRepository, id, userId))
            {
                throw new BadRequestException("Permissons denied");
            }

            _mapper.Map(model, product);
            await _productRepository.UpdateAsync(product);
            await _productRepository.SaveChangesAsync();

            var returnModel = new ProductInfoDTO();
            _mapper.Map(product, returnModel);

            return returnModel;
        }

        public async Task DeleteProductAsync(int id, string userId)
        {
            var product = await _productRepository.GetByKeyAsync(id) 
                ?? throw new ProductNotFoundException("Product not found!");

            if (await Validator.IsOwnerOrAdmin(_productRepository, id, userId))
            {
                throw new BadRequestException("Permissons denied");
            }

            if (product != null)
            {
                _commentRepository.DeleteWhere(c => c.ProductId == id);
                await _productRepository.DeleteAsync(product);
                await _productRepository.SaveChangesAsync();
            }
        }

        public async Task<ProductInfoDTO> CreateProductAsync(CreateProductDTO model, string userId)
        {
            if (await Validator.IsUnigueProduct(_productRepository, model.Name))
            {
                throw new ProductAlreadyExistsException("Name");
            }
            var product = new Product();
            _mapper.Map(model, product);
            var user = await _userManager.FindByIdAsync(userId);
            product.UserWhoCreated = user;
            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();

            var returnModel = new ProductInfoDTO();
            _mapper.Map(product, returnModel);

            return returnModel;
        }
    }
}
