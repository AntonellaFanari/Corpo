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
    public class PlanService: IPlanService
    {
        private IPlanRepository _planRepository;

        public PlanService(IPlanRepository planRepository)
        {
            _planRepository = planRepository;
        }

        public DomainResponse GetPlans()
        {
            var resp = _planRepository.GetPlans();
            return new DomainResponse
            {
                Success = true,
                Result = resp
            };
        }
        public DomainResponse Add(Plan newPlan)
        {
            try
            {
                _planRepository.Add(newPlan);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "Error al guardar el plan");
            }
        }

        public Plan GetById(int id)
        {
            return _planRepository.GetById(id);
        }

        public DomainResponse Update(int id, Plan planEdit)
        {
            try
            {
                var planQuery = _planRepository.GetById(id);
                planQuery.Name = planEdit.Name;
                planQuery.Type = planEdit.Type;
                planQuery.Credits = planEdit.Credits;
                planQuery.Price = planEdit.Price;
                planQuery.Classes = planEdit.Classes;
                _planRepository.Update(planQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar el plan");
            }
        }

        public DomainResponse Delete(int id)
        {
            _planRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }
    }
}
