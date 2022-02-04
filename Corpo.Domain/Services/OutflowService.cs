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
    public class OutflowService: IOutflowService
    {
        private IOutflowRepository _outflowRepository;
        private ICashRepository _cashRepository;

        public OutflowService(IOutflowRepository outflowRepository, ICashRepository cashRepository)
        {
            _outflowRepository = outflowRepository;
            _cashRepository = cashRepository;
        }

        public DomainResponse AddOutflow(int id, Outflow outflow)
        {
            outflow.Date = DateTime.Now;
            outflow.UserId = id;
            try
            {
                _outflowRepository.AddOutflow(outflow);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo registrar el egreso.");
            }
        }

        public DomainResponse AddOutflowType(OutflowType outflowType)
        {
            try
            {
                _outflowRepository.AddOutflowType(outflowType);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo guardar el egreso.");
            }
           
        }

        public DomainResponse DeleteOutflowType(int id)
        {
            _outflowRepository.DeleteOutflowType(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse DeleteOutflow(int id)
        {
            _outflowRepository.DeleteOutflow(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse GetAllOutflow(int id)
        {
            var cash = _cashRepository.GetById(id).Result;
            var response = _outflowRepository.GetAllOutflow(cash.Opening, cash.Closing);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetAllOutflowType()
        {
            var response = _outflowRepository.GetAllOutflowType();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public Outflow GetOutflowById(int id)
        {
            return _outflowRepository.GetOutflowById(id);
        }

        public OutflowType GetOutflowTypeById(int id)
        {
            return _outflowRepository.GetOutflowTypeById(id);

        }

        public DomainResponse UpdateOutflowType(OutflowType outflowType)
        {
            try
            {
                _outflowRepository.UpdateOutflowType(outflowType);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar el egreso.");
            }
        }
    }
}
