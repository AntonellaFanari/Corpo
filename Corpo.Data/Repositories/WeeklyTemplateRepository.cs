using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
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
            return await _context.WeeklyTemplate.Include(x => x.WeeklyWodTemplates).ThenInclude(x => x.WodTemplate).ThenInclude(x => x.WodGroups).ToListAsync();
        }

        public Task<WeeklyTemplate> GetById(int id)
        {
            return _context.WeeklyTemplate.Include(x => x.WeeklyWodTemplates).ThenInclude(x => x.WodTemplate).ThenInclude(x => x.WodGroups).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(WeeklyTemplate weeklyTemplate)
        {
            _context.WeeklyTemplate.Update(weeklyTemplate);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var weeklyTemplate = await _context.WeeklyTemplate.FindAsync(id);
            _context.WeeklyTemplate.Remove(weeklyTemplate);
            await _context.SaveChangesAsync();
        }

    }
}
