using AutoMapper;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.AdminPanel.Product;
using LabWebAPI.Contracts.DTO.Authentications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Services.Mapper
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<CreateProductDTO, Product>();
            CreateMap<UpdateProductDTO, Product>();
            CreateMap<ProductInfoDTO, Product>();
            CreateMap<Product, ProductInfoDTO>();
        }
    }
}
