using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Exceptions
{
    [Serializable]
    public class FileIsEmptyException : FileException
    {
        public FileIsEmptyException()
        : base("This file is empty.") { }
        public FileIsEmptyException(Exception innerException)
        : base("This file is empty.", innerException) { }
        public FileIsEmptyException(string path)
        : base("This file is empty.", path) { }
        protected FileIsEmptyException(SerializationInfo info, StreamingContext context)
        : base(info, context) { }
    }
}
