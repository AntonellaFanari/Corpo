using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }
        //exercise
        [HttpGet("getAllExercises")]
        public ActionResult GetAllExercises()
        {
            var response = _exerciseService.GetAllExercises();
            var listExercises = ((IEnumerable)response.Result).Cast<Exercise>().ToList();
            return Ok(listExercises);
        }

        [HttpPost("addExercise")]
        public ActionResult AddExercise([FromBody] Exercise newExercise)
        {
            var response = _exerciseService.AddExercise(newExercise);
            return this.ToActionResult(response);
        }

        [HttpDelete("deleteExercise")]
        public ActionResult DeleteExercise(int id)
        {
            var response = _exerciseService.DeleteExercise(id);
            return this.ToActionResult(response);
        }

        [HttpGet("getExerciseById")]
        public ActionResult GetExerciseById(int id)
        {
            var response = _exerciseService.GetExerciseById(id);
            return Ok(response);
        }

        [HttpPut("updateExercise")]
        public ActionResult UpdateExercise(int id, [FromBody] Exercise exerciseEdit)
        {
            var response = _exerciseService.UpdateExercise(id, exerciseEdit);
            return this.ToActionResult(response);
        }

        //categoryExercice
        [HttpGet("getAllCategories")]
        public ActionResult GetAllCategories()
        {
            var response = _exerciseService.GetAllCategories();
            var listCategory = ((IEnumerable)response.Result).Cast<CategoryExercise>().ToList();
            return Ok(listCategory);
        }

        [HttpPost("addCategory")]
        public ActionResult AddCategory([FromBody] CategoryExercise newCategory)
        {
            var response = _exerciseService.AddCategory(newCategory);
            return this.ToActionResult(response);
        }

        [HttpDelete("deleteCategory")]
        public ActionResult DeleteCategory(int id)
        {
            var response = _exerciseService.DeleteCategory(id);
            return this.ToActionResult(response);
        }

        [HttpGet("getCategoryById")]
        public ActionResult GetCategoryById(int id)
        {
            var response = _exerciseService.GetCategoryById(id);
            return Ok(response);
        }

        [HttpPut("updateCategory")]
        public ActionResult UpdateCategory(int id, [FromBody] CategoryExercise categoryEdit)
        {
            var response = _exerciseService.UpdateCategory(id, categoryEdit);
            return this.ToActionResult(response);
        }

        //tag
        [HttpGet("getAllTags")]
        public ActionResult GetAllTags()
        {
            var response = _exerciseService.GetAllTags();
            var listTags = ((IEnumerable)response.Result).Cast<Tag>().ToList();
            return Ok(listTags);
        }

        [HttpPost("addTag")]
        public ActionResult AddTag([FromBody] Tag newTag)
        {
            var response = _exerciseService.AddTag(newTag);
            return this.ToActionResult(response);
        }

        [HttpDelete("deleteTag")]
        public ActionResult DeleteTag(int id)
        {
            var response = _exerciseService.DeleteTag(id);
            return this.ToActionResult(response);
        }

        [HttpGet("getTagById")]
        public ActionResult GetTagById(int id)
        {
            var response = _exerciseService.GetTagById(id);
            return Ok(response);
        }

        [HttpPut("updateTag")]
        public ActionResult UpdateTag(int id, [FromBody] Tag tagEdit)
        {
            var response = _exerciseService.UpdateTag(id, tagEdit);
            return this.ToActionResult(response);
        }

    }
}
