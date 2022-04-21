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
    public class TestTemplateService: ITestTemplateService
    {
        private ITestTemplateRepository _testTemplateRepository;

        public TestTemplateService(ITestTemplateRepository testTemplateRepository)
        {
            _testTemplateRepository = testTemplateRepository;
        }

        public async Task<DomainResponse> Add(TestTemplate test)
        {
            try
            {
                await _testTemplateRepository.Add(test);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el test.");
            }
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _testTemplateRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _testTemplateRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _testTemplateRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(TestTemplate test)
        {
            try
            {
                var testQuery = await _testTemplateRepository.GetById(test.Id);
                testQuery.Name = test.Name;
                testQuery.TestExercises = test.TestExercises;
                await _testTemplateRepository.Update(testQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar el test.");
            }
        }
    }
}
