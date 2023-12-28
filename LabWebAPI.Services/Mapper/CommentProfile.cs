using AutoMapper;
using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.DTO.AdminPanel.Product;
using LabWebAPI.Contracts.DTO.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Services.Mapper
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<CreateCommentDTO, Comment>();
            CreateMap<Comment, CreateCommentDTO>();
            CreateMap<CommentDTO, Comment>();
            CreateMap<Comment, CommentDTO>();
        }
    }
}
