namespace Corpo.Domain.Models
{
    public class FailedDomainResponse: DomainResponse
    {
       
        public FailedDomainResponse( string error)
        {
            Errors.Add(error);
            Success = false;
        }
    }
}
