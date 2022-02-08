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
    public class ModalityRepository: IModalityRepository
    {
        private CorpoContext _context;

        public ModalityRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(Modality modality)
        {
            _context.Add(modality);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var modality = await _context.Modality.FindAsync(id);
            _context.Modality.Remove(modality);
            await _context.SaveChangesAsync();
        }

        public Task<List<Modality>> GetAll()
        {
            return  _context.Modality.ToListAsync();
        }

        public async Task<Modality> GetById(int id)
        {
            return await _context.Modality.FindAsync(id);
        }

        public async Task Update(Modality modality)
        {
            _context.Modality.Update(modality);
            await _context.SaveChangesAsync();
        }
    }
}
