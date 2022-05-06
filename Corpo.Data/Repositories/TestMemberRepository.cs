using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class TestMemberRepository : ITestMemberRepository
    {
        private CorpoContext _context;

        public TestMemberRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task Add(TestMember test)
        {
            try
            {
                _context.TestMember.Add(test);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

            }
        }

        public async Task AddResultTestHeartRateExercise(TestHeartRateExercise result)
        {
            _context.TestHeartRateExercise.Add(result);
            await _context.SaveChangesAsync();
        }

        public async Task AddResultTestRepetitionExercise(TestRepetitionExercise result)
        {
            _context.TestRepetitionExercise.Add(result);
            await _context.SaveChangesAsync();
        }

        public async Task AddResultTestVideoExercise(TestVideoExercise result)
        {
            _context.TestVideoExercise.Add(result);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var test = await _context.TestMember.FindAsync(id);
            _context.TestMember.Remove(test);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TestMember>> GetAll()
        {
            return await _context.TestMember
                 .Include(x => x.TestExercisesMember)
                 .ToListAsync();

        }

        public async Task<List<TestMember>> GetAllByMemberId(int id)
        {
            return await _context.TestMember
                .Where(x => x.MemberId == id)
                 .Include(x => x.TestExercisesMember)
                 .ToListAsync();

        }

        public async Task<TestMember> GetById(int id)
        {
            return await _context.TestMember.Include(x => x.TestExercisesMember).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TestExerciseMember> GetExerciseById(int id)
        {
            return await _context.TestExerciseMember.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TestMember> GetPendingByMemberId(int id)
        {
            return await _context.TestMember.Include(x => x.TestExercisesMember).FirstOrDefaultAsync(x => x.MemberId == id && x.Status == StatusTest.Pending);
        }

        public async Task<bool> GetPendingExercise(int id)
        {
            var exercise = await _context.TestExerciseMember.FirstOrDefaultAsync(x => x.TestMemberId == id && x.Status == StatusTest.Pending);
            if (exercise != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Task<List<TestExerciseMember>> GetResult(int id)
        {
           return _context.TestExerciseMember
                .Where(x => x.TestMemberId == id)
                .Include(x => x.TestHeartRateExercise)
                .IgnoreAutoIncludes()
                .Include(x => x.TestRepetitionExercise)
                .IgnoreAutoIncludes()
                .Include(x => x.TestVideoExercise)
                .IgnoreAutoIncludes()
                .ToListAsync();
        }

        public async Task Update(TestMember test)
        {
            _context.TestMember.Update(test);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateExercise(TestExerciseMember exerciseMember)
        {
            _context.TestExerciseMember.Update(exerciseMember);
            await _context.SaveChangesAsync();
        }
    }
}
