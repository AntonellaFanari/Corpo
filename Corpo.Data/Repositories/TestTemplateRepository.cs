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
    public class TestTemplateRepository: ITestTemplateRepository
    {
        private CorpoContext _context;

        public TestTemplateRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(TestTemplate test)
        {
            _context.TestTemplate.Add(test);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var test = await _context.TestTemplate.FindAsync(id);
            _context.TestTemplate.Remove(test);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TestTemplate>> GetAll()
        {
            return await _context.TestTemplate
                .Include(x => x.TestExercises)
                .ToListAsync();
        }

        public async Task<TestTemplate> GetById(int id)
        {
            return await _context.TestTemplate.Include(x => x.TestExercises).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(TestTemplate test)
        {
            _context.TestTemplate.Update(test);
            await _context.SaveChangesAsync();
        }
    }
}
