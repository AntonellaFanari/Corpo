using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ITestTemplateRepository
    {
        Task<List<TestTemplate>> GetAll();
        Task Add(TestTemplate test);
        Task Delete(int id);
        Task<TestTemplate> GetById(int id);
        Task Update(TestTemplate test);
        Task<List<ExerciseFMS>> GetAllExercisesFMS();
        Task<TestTemplate> GetByLevel(int level);
        Task<TestTemplate> GetDetailById(int id);
    }
}
