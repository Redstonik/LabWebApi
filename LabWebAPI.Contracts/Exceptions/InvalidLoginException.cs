using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Exceptions
{
    public class InvalidLoginException : UnauthorizedException
    {
        public InvalidLoginException() : base("Incorrect Email or Password!") { }

    }
}
