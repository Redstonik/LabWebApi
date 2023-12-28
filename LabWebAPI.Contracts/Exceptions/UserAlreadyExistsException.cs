using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Exceptions
{
    public class UserAlreadyExistsException : BadRequestException
    {
        public UserAlreadyExistsException(string value) : base($"User with this was already exists!") { }
    }
}
