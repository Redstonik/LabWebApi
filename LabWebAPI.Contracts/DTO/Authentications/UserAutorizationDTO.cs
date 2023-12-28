using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.DTO.Authentications
{
    public class UserAutorizationDTO
    {
        public bool IsAuthenticated { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
