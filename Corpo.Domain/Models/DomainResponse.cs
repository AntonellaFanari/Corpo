using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Models
{
    public class DomainResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
        public object Result { get; set; }
        public DomainResponse()
        {

        }
        public DomainResponse(bool success, string message, string error)
        {
            Success = success;
            Message = message;
            Errors.Add(error);
        }

        public DomainResponse(bool success, string message, List<string> errors)
        {
            Success = success;
            Message = message;
            Errors = errors;
        }
    }
}
