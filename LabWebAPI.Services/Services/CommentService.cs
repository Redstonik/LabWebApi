using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Data;
using LabWebAPI.Contracts.Services;
using LabWebAPI.Contracts.DTO.Comment;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using AutoMapper;
using LabWebAPI.Contracts.DTO.AdminPanel.Product;

namespace LabWebAPI.Services.Services
{
    public class CommentService : ICommentService
    {
        private protected readonly IMapper _mapper;
        private readonly IAdminService _adminService;
        private readonly IRepository<Comment> _commentRepository;
        public CommentService(IRepository<Comment> commentRepository, 
            IMapper mapper,
            IAdminService adminService)
        {
            _mapper = mapper;
            _commentRepository = commentRepository;
            _adminService = adminService;
        }
        public async Task<IEnumerable<CommentDTO>> GetAllCommentsAsync(int productId)
        {
            var comments = _commentRepository.Query()
                .Where(x => x.ProductId == productId)
                .ToList();

            var commentsInfo = comments.Select(comment =>
            {
                var user = _adminService.GetUserByIdAsync(comment.UserId).Result;
                return new CommentDTO()
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    ProductId = productId,
                    User = user,
                };
            })
           .ToList();
            return commentsInfo;
        }

        public async Task<CommentDTO> AddCommentAsync(CreateCommentDTO comment)
        {
            var commentEntity = _mapper.Map<Comment>(comment);

            var result = await _commentRepository.AddAsync(commentEntity);
            await _commentRepository.SaveChangesAsync();
            var user = _adminService.GetUserByIdAsync(comment.UserId).Result;

            var response = _mapper.Map<CommentDTO>(result);
            response.User = user;
            return response;
        }
        public async Task DeleteCommentAsync(int commentId)
        {
            var comment = await _commentRepository.GetByIdAsync(commentId);
            if (comment != null)
            {
                await _commentRepository.DeleteAsync(comment);
                await _commentRepository.SaveChangesAsync();
            }
        }
    }
}