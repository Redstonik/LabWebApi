using LabWebAPI.Contracts.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.DTO.Authentications
{
    public class UserRegistrationDTO
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime Birthday { get; set; }
        public AuthorizationRoles Role { get; set; }
        public string Password { get; set; }
    }
}
