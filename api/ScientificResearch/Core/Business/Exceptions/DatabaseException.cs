using ScientificResearch.Core.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Business.Exceptions
{
    public class DatabaseException : Exception
    {
        public DatabaseExceptionType ExceptionType { private set; get; }

        public DatabaseException(DatabaseExceptionType exceptionType, string message = "") : base(message)
        {
            ExceptionType = exceptionType;
        }
    }
}
