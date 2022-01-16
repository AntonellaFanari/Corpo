using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IExerciseRepository
    {
        //exercise
        List<Exercise> GetAllExercises();
        void AddExercise(Exercise newExercise);
        void UpdateExercise(Exercise exerciseEdit);
        Exercise GetExerciseById(int id);
        void DeleteExercise(int id);

        //CategoryExercise
        List<CategoryExercise> GetAllCategories();
        void AddCategory(CategoryExercise newCategory);
        void UpdateCategory(CategoryExercise categoryEdit);
        CategoryExercise GetCategoryById(int id);
        void DeleteCategory(int id);
        CategoryExercise GetCategoryName(string name);

        //tag
        List<Tag> GetAllTags();
        void AddTag(Tag newtag);
        void UpdateTag(Tag tagEdit);
        Tag GetTagById(int id);
        void DeleteTag(int id);
        Tag GetTagName(string name);
    }
}
