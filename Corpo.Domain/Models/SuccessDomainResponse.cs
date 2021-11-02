namespace Corpo.Domain.Models
{
    public class SuccessDomainResponse: DomainResponse
    {
       
        public SuccessDomainResponse(string message, object result)
        {
            Message = message;
            Result = result;
            Success = true;
        }
    }
}
