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
    public class ExerciseRepository : IExerciseRepository
    {
        private CorpoContext _context;

        public ExerciseRepository(CorpoContext context)
        {
            _context = context;
        }

        //exercise
        public List<Exercise> GetAllExercises()
        {
            var list = _context.Exercise
                        .Include(x=>x.CategoryExercise).ToList();
            return list;
        }
        public void AddExercise(Exercise newExercise)
        {
            foreach (var tag in newExercise.Tags)
            {
                _context.Tag.Attach(tag);
            };
            _context.Exercise.Add(newExercise);
            _context.SaveChanges();
        }

        public Exercise GetExerciseById(int id)
        {
            var exercise = _context.Exercise
                            .Include(x=>x.CategoryExercise)
                            .Include(x=>x.Tags)
                            .FirstOrDefault(x=>x.Id == id);
            return exercise;
        }
        public void UpdateExercise(Exercise exerciseEdit)
        {
            _context.Exercise.Update(exerciseEdit);
            _context.SaveChanges();
        }
        public void DeleteExercise(int id)
        {
            var exercise = _context.Exercise.Find(id);
            _context.Exercise.Remove(exercise);
            _context.SaveChanges();
        }

        public Task<List<Exercise>> GetAllExercisesByIdCategoryAsync(int id)
        {
           return _context.Exercise.Where(x => x.CategoryExerciseId == id).ToListAsync();
        }

        //categoryExercice
        public List<CategoryExercise> GetAllCategories()
        {
            var list = _context.CategoryExercise.ToList();
            return list;
        }
        public CategoryExercise GetCategoryName(string name)
        {
            return _context.CategoryExercise.FirstOrDefault(x => x.Name == name);
        }
        public void AddCategory(CategoryExercise newCategory)
        {
            _context.CategoryExercise.Add(newCategory);
            _context.SaveChanges();
        }

        public CategoryExercise GetCategoryById(int id)
        {
            var category = _context.CategoryExercise.Find(id);
            return category;
        }
        public void UpdateCategory(CategoryExercise categoryEdit)
        {
            _context.CategoryExercise.Update(categoryEdit);
            _context.SaveChanges();
        }
        public void DeleteCategory(int id)
        {
            var category = _context.CategoryExercise.Find(id);
            _context.CategoryExercise.Remove(category);
            _context.SaveChanges();
        }
        //tag
        public List<Tag> GetAllTags()
        {
            var list = _context.Tag.OrderBy(x=>x.Name).Include(x => x.Exercises).ToList();
            return list;
        }
        public Tag GetTagName(string name)
        {
            return _context.Tag.FirstOrDefault(x => x.Name == name);
        }
        public void AddTag(Tag newTag)
        {
            _context.Tag.Add(newTag);
            _context.SaveChanges();
        }

        public Tag GetTagById(int id)
        {
            var tag = _context.Tag.Find(id);
            return tag;
        }
        public void UpdateTag(Tag tagEdit)
        {
            _context.Tag.Update(tagEdit);
            _context.SaveChanges();
        }
        public void DeleteTag(int id)
        {
            var tag = _context.Tag.Find(id);
            _context.Tag.Remove(tag);
            _context.SaveChanges();
        }

    }
}
