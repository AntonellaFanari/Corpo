using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Corpo.Web.Controllers
{
    [Route("api/test-member")]
    [ApiController]
    public class TestMemberController : CorpoBaseController
    {
        private ITestMemberService _testMemberService;

        public TestMemberController(ITestMemberService testMemberService)
        {
            _testMemberService = testMemberService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TestMember>>> GetAll()
        {
            var response = await _testMemberService.GetAll();
            return this.ToActionResult(response);
        }


        [HttpGet("all-by-memberId/{id}")]
        public async Task<ActionResult<List<TestMember>>> GetAllByMemberId(int id)
        {
            var response = await _testMemberService.GetAllByMemberId(id);
            return this.ToActionResult(response);
        }


        [HttpPost]
        public async Task<ActionResult> Add([FromBody] TestMember test)
        {
            var response = await _testMemberService.Add(test);
            return this.ToActionResult(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _testMemberService.Delete(id);
            return this.ToActionResult(response);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TestMember>> GetById(int id)
        {
            var response = await _testMemberService.GetById(id);
            return this.ToActionResult(response);
        }

        [HttpGet("detail-by-id")]
        public async Task<ActionResult<TestMember>> GetDetailById(int id)
        {
            var response = await _testMemberService.GetDetailById(id);
            return this.ToActionResult(response);
        }


        [HttpPut]
        public async Task<ActionResult> Update([FromBody] TestMember test)
        {
            var response = await _testMemberService.Update(test);
            return this.ToActionResult(response);
        }

        [HttpGet("all-by-member-logged")]
        public async Task<ActionResult<List<TestMember>>> GetAllByMemberLogged()
        {
            var user = GetUser();
            var response = await _testMemberService.GetAllByMemberId(user.Id);
            return this.ToActionResult(response);
        }

        [HttpGet("pending-by-member-logged")]
        public async Task<ActionResult<List<TestMember>>> GetPendingByMemberLogged()
        {
            var user = GetUser();
            var response = await _testMemberService.GetPendingByMemberId(user.Id);
            return this.ToActionResult(response);
        }


        [HttpGet("exercise-by-id")]
        public async Task<ActionResult<TestExerciseMember>> GetExerciseById(int id)
        {
            var response = await _testMemberService.GetExerciseById(id);
            return this.ToActionResult(response);
        }

        [HttpPost("result-test-heart-rate-exercise")]
        public async Task<ActionResult> AddResultTestHeartRateExercise(TestHeartRateExercise result)
        {
            var user = this.GetUser();
            var response = await _testMemberService.AddResultTestHeartRateExercise(result, user.Id);
            return this.ToActionResult(response);
        }

        [HttpPost("result-test-repetition-exercise")]
        public async Task<ActionResult> AddResultTestRepetitionExercise(TestRepetitionExercise result)
        {
            var response = await _testMemberService.AddResultTestRepetitionExercise(result);
            return this.ToActionResult(response);
        }

        [HttpPost("result-test-video-exercise")]
        public async Task<ActionResult> AddResultTestVideoExercise(List<IFormFile> file)
        {
            var message = HttpContext.Request;
            var exerciseId = HttpContext.Request.Form["exerciseId"].ToString();
            var testId = HttpContext.Request.Form["testId"].ToString();
            var rate = HttpContext.Request.Form["rate"];
            var files = HttpContext.Request.Form.Files;
            var testVideoExercise = new TestVideoExercise();
            testVideoExercise.TestExerciseMemberId = Convert.ToInt32(exerciseId);
            testVideoExercise.TestMemberId = Convert.ToInt32(testId);
            testVideoExercise.Rate = Convert.ToInt32(rate);
            var response = await _testMemberService.AddResultTestVideoExercise(testVideoExercise, files);
            return this.ToActionResult(response);
        }

        [HttpGet("result")]
        public async Task<ActionResult<List<TestExerciseMember>>> GetResult(int id)
        {
            var response = await _testMemberService.GetResult(id);
            return this.ToActionResult(response);
        }

        [HttpGet("exercise-fms")]
        public async Task<ActionResult<ExerciseFMS>> GetExerciseFms(int id)
        {
            var response = await _testMemberService.GetExerciseFms(id);
            return this.ToActionResult(response);
        }


        [HttpGet("exists-test-pending")]
        public async Task<ActionResult> GetExistsTestPending()
        {
            var user = GetUser();
            var response = await _testMemberService.GetExistsTestPending(user.Id);
            return this.ToActionResult(response);
        }


    }
}
