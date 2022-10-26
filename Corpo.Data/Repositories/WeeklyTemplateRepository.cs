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
    public class WeeklyTemplateRepository: IWeeklyTemplateRepository
    {
        private CorpoContext _context;

        public WeeklyTemplateRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(WeeklyTemplate weeklyTemplate)
        {
            _context.WeeklyTemplate.Add(weeklyTemplate);
            await _context.SaveChangesAsync();
        }

        public async Task<List<WeeklyTemplate>> GetAll()
        {
            return await _context.WeeklyTemplate.ToListAsync();
        }

        public Task<WeeklyTemplate> GetById(int id)
        {
            return _context.WeeklyTemplate.Include(x => x.WeeklyWodTemplates).FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
