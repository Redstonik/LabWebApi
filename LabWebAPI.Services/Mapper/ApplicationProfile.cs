using AutoMapper;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.AdminPanel;
using LabWebAPI.Contracts.DTO.Authentications;
namespace LabWebAPI.Services.Mapper
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<UserRegistrationDTO, User>();
            CreateMap<UserInfoDTO, User>();
            CreateMap<User, UserInfoDTO>();
        }
    }
}