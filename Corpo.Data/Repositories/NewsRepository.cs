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
    public class NewsRepository: INewsRepository
    {
        private CorpoContext _context;

        public NewsRepository(CorpoContext context)
        {
            _context = context;
        }

        public void Add(News news)
        {
            _context.News.Add(news);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var news = _context.News.Find(id);
            _context.News.Remove(news);
            _context.SaveChanges();
        }

        public Task<List<News>> GetAll()
        {
            return _context.News.ToListAsync();
        }

        public Task<News> GetById(int id)
        {
            return _context.News.FirstOrDefaultAsync(x=> x.Id == id);
        }

        public void Update(News news)
        {
            _context.News.Update(news);
            _context.SaveChanges();
        }
    }
}
