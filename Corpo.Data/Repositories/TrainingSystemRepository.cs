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
    public class TrainingSystemRepository: ITrainingSystemRepository
    {
        private CorpoContext _context;

        public TrainingSystemRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(TrainingSystem trainingSystem)
        {
            _context.TrainingSystem.Add(trainingSystem);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var intensity = await _context.TrainingSystem.FindAsync(id);
            _context.Remove(intensity);
            await _context.SaveChangesAsync();
        }

        public Task<List<TrainingSystem>> GetAll()
        {
            return _context.TrainingSystem.ToListAsync();
        }

        public async Task<TrainingSystem> GetById(int id)
        {
            return await _context.TrainingSystem.FindAsync(id);
        }

        public Task<TrainingSystem> GetByUpByDown(string up, string down)
        {
            return _context.TrainingSystem.FirstOrDefaultAsync(x => x.Up == up && x.Down == down);
        }

        public async Task Update(TrainingSystem trainingSystem)
        {
            _context.TrainingSystem.Update(trainingSystem);
            await _context.SaveChangesAsync();
        }
    }
}
