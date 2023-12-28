using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.Mvc;
using LabWebAPI.Contracts.DTO.Comment;
using Microsoft.Extensions.Hosting;
using AutoMapper;

namespace LabWebApi.Web.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComments(int productId)
        {
            var comments = await _commentService.GetAllCommentsAsync(productId);
   
            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] CreateCommentDTO comment)
        {
            var result = await _commentService.AddCommentAsync(comment);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            await _commentService.DeleteCommentAsync(id);
            return NoContent();
        }
    }
}
