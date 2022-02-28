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
    class WeeklyGoalRepository: IWeeklyGoalRepository
    {
        private CorpoContext _context;

        public WeeklyGoalRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(WeeklyGoal weeklyGoal)
        {
            await _context.WeeklyGoal.AddAsync(weeklyGoal);
            await _context.SaveChangesAsync();

        }

        public async Task Delete(int id)
        {
            var weeklyGoal = await _context.WeeklyGoal.FindAsync(id);
            _context.WeeklyGoal.Remove(weeklyGoal);
            await _context.SaveChangesAsync();
        }

        public Task<List<WeeklyGoal>> GetAll()
        {
            return _context.WeeklyGoal.ToListAsync();
        }

        public async Task<WeeklyGoal> GetById(int id)
        {
            return await _context.WeeklyGoal.FindAsync(id);
        }

        public async Task Update(WeeklyGoal weeklyGoal)
        {
            _context.WeeklyGoal.Update(weeklyGoal);
            await _context.SaveChangesAsync();
        }
    }
}
