using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.DTO.User
{
    public class UserUploadImageDTO
    {
        public IFormFile Image { get; set; }
    }

}
