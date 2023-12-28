using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.AdminPanel.Product;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LabWebAPI.Contracts.DTO.AdminPanel;

namespace LabWebAPI.Services.Mapper
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<ProfileInfoDTO, User>();
        }
    }
}
