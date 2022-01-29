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
    public class WodTemplateRepository : IWodTemplateRepository
    {
        private CorpoContext _context;

        public WodTemplateRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(WodTemplate wodTemplate)
        {

            await _context.WodTemplate.AddAsync(wodTemplate);
            await _context.SaveChangesAsync();


        }

        public async Task Delete(int id)
        {
            var wodTemplate = _context.WodTemplate.Find(id);
            _context.WodTemplate.Remove(wodTemplate);
            await _context.SaveChangesAsync();


        }

        public async Task<List<WodTemplate>> GetAll()
        {
            return await _context.WodTemplate
                .Include(x => x.WodGroups)
                .ThenInclude(x => x.Modality)
                  .Include(x => x.WodGroups)
                .ThenInclude(x => x.Exercise)
                .ToListAsync();
        }

        public Task<WodTemplate> GetById(int id)
        {
            return _context.WodTemplate.Include(x => x.WodGroups)
                .ThenInclude(x => x.Modality)
                  .Include(x => x.WodGroups)
                .ThenInclude(x => x.Exercise)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(WodTemplate wodTemplate)
        {
           
                _context.WodTemplate.Update(wodTemplate);
                await _context.SaveChangesAsync();
             
        }

    }
}
