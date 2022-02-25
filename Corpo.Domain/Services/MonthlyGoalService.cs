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
    public class MonthlyGoalService: IMonthlyGoalService
    {
        private IMonthlyGoalRepository _monthlyGoalRepository;

        public MonthlyGoalService(IMonthlyGoalRepository monthlyGoalRepository)
        {
            _monthlyGoalRepository = monthlyGoalRepository;
        }

        public async Task<DomainResponse> Add(MonthlyGoal monthlyGoal)
        {
            try
            {
                await _monthlyGoalRepository.Add(monthlyGoal);
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
            await _monthlyGoalRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _monthlyGoalRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _monthlyGoalRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(MonthlyGoal monthlyGoal)
        {           
            try
            {
                await _monthlyGoalRepository.Update(monthlyGoal);
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
