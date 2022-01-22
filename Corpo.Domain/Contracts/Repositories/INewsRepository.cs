using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface INewsRepository
    {
        Task<List<News>> GetAll();
        void Add(News news);
        Task<News> GetById(int id);
        void Update(News news);
        void Delete(int id);
    }
}
