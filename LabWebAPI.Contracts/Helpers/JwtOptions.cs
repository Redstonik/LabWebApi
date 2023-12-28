using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Helpers
{
    public class JwtOptions
    {
        public string Issuer { get; set; }
        public string Key { get; set; }
        public int LifeTime { get; set; }
    }
}
