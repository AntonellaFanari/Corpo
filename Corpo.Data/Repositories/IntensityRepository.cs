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
    public class IntensityRepository: IIntensityRepository
    {
        private CorpoContext _context;

        public IntensityRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(Intensity intensity)
        {
            _context.Intensity.Add(intensity);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var intensity = await _context.Intensity.FindAsync(id);
            _context.Remove(intensity);
            await _context.SaveChangesAsync();
        }

        public Task<List<Intensity>> GetAll()
        {
            return _context.Intensity.ToListAsync();
        }

        public async Task<Intensity> GetById(int id)
        {
            return await _context.Intensity.FindAsync(id);
        }

        public Task<Intensity> GetByUpByDown(string up, string down)
        {
            return _context.Intensity.FirstOrDefaultAsync(x => x.Up == up && x.Down == down);
        }

        public async Task Update(Intensity intensity)
        {
            _context.Intensity.Update(intensity);
            await _context.SaveChangesAsync();
        }
    }
}
