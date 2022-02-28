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
    public class WeeklyGoalService: IWeeklyGoalService
    {
        private IWeeklyGoalRepository _weeklyGoalRepository;

        public WeeklyGoalService(IWeeklyGoalRepository weeklyGoalRepository)
        {
            _weeklyGoalRepository = weeklyGoalRepository;
        }

        public async Task<DomainResponse> Add(WeeklyGoal weeklyGoal)
        {

            try
            {
                await _weeklyGoalRepository.Add(weeklyGoal);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el objetivo.");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _weeklyGoalRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _weeklyGoalRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _weeklyGoalRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(WeeklyGoal weeklyGoal)
        {
            try
            {
                await _weeklyGoalRepository.Update(weeklyGoal);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar el objetivo.");
            }
        }
    }
}
