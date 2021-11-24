using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IClassService
    {
        DomainResponse Add(Class newClass);
        DomainResponse GetAll();
        DomainResponse GetById(int id);
        DomainResponse Delete(int id);
        DomainResponse Update(int id, Class classEdit);
    }
}
