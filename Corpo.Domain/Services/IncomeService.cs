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
    public class IncomeService: IIncomeService
    {
        private IIncomeRepository _incomeRepository;
        private ICashRepository _cashRepository;

        public IncomeService(IIncomeRepository incomeRepository, ICashRepository cashRepository)
        {
            _incomeRepository = incomeRepository;
            _cashRepository = cashRepository;
        }

        public async Task<DomainResponse> Add(int id, Income income)
        {
            try
            {
                income.Date = DateTime.Now;
                income.UserId = id;
                await _incomeRepository.Add(income);
                await _cashRepository.UpdateMonthlyCash(income.Date, income.Amount, "outflow");
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo agregar el ingreso");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            var income = await _incomeRepository.GetById(id);
            await _incomeRepository.Delete(id);
            await _cashRepository.UpdateMonthlyCash(income.Date, -income.Amount, "inflow");
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll(int id)
        {
            var cash = await _cashRepository.GetById(id);
            var response = await _incomeRepository.GetAll(cash.Opening, cash.Closing);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _incomeRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
