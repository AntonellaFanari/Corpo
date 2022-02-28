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
    public class MonthlyGoalRepository : IMonthlyGoalRepository
    {
        private CorpoContext _context;

        public MonthlyGoalRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(MonthlyGoal monthlyGoal)
        {
            await _context.MonthlyGoal.AddAsync(monthlyGoal);
            await _context.SaveChangesAsync();

        }

        public async Task Delete(int id)
        {
            var monthlyGoal = await _context.MonthlyGoal.FindAsync(id);
            _context.MonthlyGoal.Remove(monthlyGoal);
            await _context.SaveChangesAsync();
        }

        public Task<List<MonthlyGoal>> GetAll()
        {
            return _context.MonthlyGoal.ToListAsync();
        }

        public async Task<MonthlyGoal> GetById(int id)
        {
            return await _context.MonthlyGoal.FindAsync(id);
        }

        public async Task Update(MonthlyGoal monthlyGoal)
        {
            _context.MonthlyGoal.Update(monthlyGoal);
            await _context.SaveChangesAsync();
        }
    }
}
