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
    public class WodMemberRepository: IWodMemberRepository
    {
        private CorpoContext _context;

        public WodMemberRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(WodMember wodMember)
        {

            await _context.WodMember.AddAsync(wodMember);
            await _context.SaveChangesAsync();
        }

        public async Task<List<WodMember>> GetAllWodMember(int id, DateTime from, DateTime to)
        {
            return await _context.WodMember
               .Include(x => x.WodGroupsMember)
               .ThenInclude(x => x.Modality)
                 .Include(x => x.WodGroupsMember)
               .ThenInclude(x => x.Exercise)
               .Where(x => x.MemberId == id && x.Date >= from && x.Date <= to)
               .ToListAsync();
        }

        public async Task Delete(int id)
        {
            var wodMember = _context.WodMember.Find(id);
            _context.WodMember.Remove(wodMember);
            await _context.SaveChangesAsync();
        }

        public Task<WodMember> GetById(int id)
        {
            return _context.WodMember.Include(x => x.WodGroupsMember)
                 .ThenInclude(x => x.Modality)
                   .Include(x => x.WodGroupsMember)
                 .ThenInclude(x => x.Exercise)
                 .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(WodMember wodMember)
        {
            _context.WodMember.Update(wodMember);
            await _context.SaveChangesAsync();
        }
    }
}
