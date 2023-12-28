using LabWebAPI.Contracts.Data.Entities;
using LabWebAPI.Contracts.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LabWebAPI.Contracts.DTO.AdminPanel;

namespace LabWebAPI.Contracts.DTO.Comment
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public UserInfoDTO User { get; set; }
        public int ProductId { get; set; }

    }
}
