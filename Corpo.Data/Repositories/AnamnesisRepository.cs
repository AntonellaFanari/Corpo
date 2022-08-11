using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class AnamnesisRepository: IAnamnesisRepository
    {
        private CorpoContext _context;

        public AnamnesisRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(Anamnesis anamnesis)
        {
            _context.Anamnesis.Add(anamnesis);
            await _context.SaveChangesAsync();
        }

    
        public Task<Anamnesis> GetByMemberId(int id)
        {
            return _context.Anamnesis.FirstOrDefaultAsync(x => x.MemberId == id);
        }

    }
}
