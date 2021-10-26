using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IMemberService
    {
        DomainResponse GetAll();
        Member GetById(int id);
        DomainResponse Add(Member member);
    }
}
