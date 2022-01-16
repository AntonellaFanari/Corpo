using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class ExerciseService: IExerciseService
    {
        private IExerciseRepository _exerciseRepository;

        public ExerciseService(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }

        //exercise
        public DomainResponse GetAllExercises()
        {
            var response = _exerciseRepository.GetAllExercises();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse AddExercise(Exercise newExercise)
        {
            try
            {
                _exerciseRepository.AddExercise(newExercise);
                return new DomainResponse
                {
                    Success = true
                };

            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar el ejercicio.");
            }
        }

        public DomainResponse UpdateExercise(int id, Exercise exerciseEdit)
        {

            try
            {
                var exerciseQuery = _exerciseRepository.GetExerciseById(id);
                exerciseQuery.Name = exerciseEdit.Name;
                exerciseQuery.CategoryExerciseId = exerciseEdit.CategoryExerciseId;
                exerciseQuery.Tags = exerciseEdit.Tags;
                exerciseQuery.Video = exerciseEdit.Video;
                _exerciseRepository.UpdateExercise(exerciseQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar el ejercicio.");
            }
        }

        public DomainResponse GetExerciseById(int id)
        {
            var response = _exerciseRepository.GetExerciseById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
        public DomainResponse DeleteExercise(int id)
        {
            _exerciseRepository.DeleteExercise(id);
            return new DomainResponse
            {
                Success = true
            };
        }


        //categoryExercice
        public DomainResponse GetAllCategories()
        {
            var response = _exerciseRepository.GetAllCategories();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse AddCategory(CategoryExercise newCategory)
        {
            var categoryNameExist = _exerciseRepository.GetCategoryName(newCategory.Name);
            if (categoryNameExist == null)
            {
                try
                {
                    _exerciseRepository.AddCategory(newCategory);
                    return new DomainResponse
                    {
                        Success = true
                    };

                }
                catch (Exception ex)
                {
                    return new DomainResponse(false, ex.Message, "No se pudo agregar la categoria.");
                }
            }
            else
            {
                return new DomainResponse(false, "La categoria ya existe", "La categoria ya existe.");
            }
            
        }

        public DomainResponse UpdateCategory(int id, CategoryExercise categoryEdit)
        {
            var categoryNameExist = _exerciseRepository.GetCategoryName(categoryEdit.Name);
            if (categoryNameExist == null)
            {
                try
                {
                    var categoryQuery = _exerciseRepository.GetCategoryById(id);
                    categoryQuery.Name = categoryEdit.Name;
                    _exerciseRepository.UpdateCategory(categoryQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    return new DomainResponse(false, ex.Message, "No se pudo modificar la clase.");
                }
            }
            else
            {
                return new DomainResponse(false, "La categoria ya existe", "La categoria ya existe.");
            }

        }

        public DomainResponse GetCategoryById(int id)
        {
            var response = _exerciseRepository.GetCategoryById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
        public DomainResponse DeleteCategory(int id)
        {
            _exerciseRepository.DeleteCategory(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        //tag
        public DomainResponse GetAllTags()
        {
            var response = _exerciseRepository.GetAllTags();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse AddTag(Tag newtag)
        {
            var tagNameExist = _exerciseRepository.GetTagName(newtag.Name);
            if (tagNameExist == null)
            {
                try
                {
                    _exerciseRepository.AddTag(newtag);
                    return new DomainResponse
                    {
                        Success = true
                    };

                }
                catch (Exception ex)
                {
                    return new DomainResponse(false, ex.Message, "No se pudo agregar el tag.");
                }
            }
            else
            {
                return new DomainResponse(false, "El tag ya existe", "El tag ya existe.");
            }
            
        }

        public DomainResponse UpdateTag(int id, Tag tagEdit)
        {
            var tagNameExist = _exerciseRepository.GetTagName(tagEdit.Name);
            if (tagNameExist == null)
            {
                try
                {
                    var tagQuery = _exerciseRepository.GetTagById(id);
                    tagQuery.Name = tagEdit.Name;
                    _exerciseRepository.UpdateTag(tagQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    return new DomainResponse(false, ex.Message, "No se pudo modificar el tag.");
                }
            }
            else
            {
                return new DomainResponse(false, "El tag ya existe", "El tag ya existe.");
            }
            
        }

        public DomainResponse GetTagById(int id)
        {
            var response = _exerciseRepository.GetTagById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
        public DomainResponse DeleteTag(int id)
        {
            _exerciseRepository.DeleteTag(id);
            return new DomainResponse
            {
                Success = true
            };
        }
    }
}
