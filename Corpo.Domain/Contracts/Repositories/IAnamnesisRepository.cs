using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IAnamnesisRepository
    {
        Task Add(Anamnesis anamnesis);
        Task<Anamnesis> GetByMemberId(int id);
        
    }
}
