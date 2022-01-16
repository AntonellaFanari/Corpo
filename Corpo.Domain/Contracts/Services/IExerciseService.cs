using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IExerciseService
    {
        //exercises
        DomainResponse GetAllExercises();
        DomainResponse AddExercise(Exercise newExercise);
        DomainResponse UpdateExercise(int id, Exercise exerciseEdit);
        DomainResponse GetExerciseById(int id);
        DomainResponse DeleteExercise(int id);
        //CategoryExercise
        DomainResponse GetAllCategories();
        DomainResponse AddCategory(CategoryExercise newCategory);
        DomainResponse UpdateCategory(int id, CategoryExercise categoryEdit);
        DomainResponse GetCategoryById(int id);
        DomainResponse DeleteCategory(int id);

        //tag
        DomainResponse GetAllTags();
        DomainResponse AddTag(Tag newTag);
        DomainResponse UpdateTag(int id, Tag tagEdit);
        DomainResponse GetTagById(int id);
        DomainResponse DeleteTag(int id);


    }
}
