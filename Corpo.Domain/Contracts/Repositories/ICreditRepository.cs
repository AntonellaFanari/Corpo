using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ICreditRepository
    {
        int Add(Credit credit);
        void Update(Credit credit);
    }
}
