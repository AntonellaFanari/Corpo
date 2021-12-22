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
        IOutflowRepository _outflowRepository;

        public OutflowService(IOutflowRepository outflowRepository)
        {
            _outflowRepository = outflowRepository;
        }

        public DomainResponse AddOutflow(Outflow outflow)
        {
            outflow.Date = DateTime.Now;
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

        public DomainResponse GetAllOutflow()
        {
            var response = _outflowRepository.GetAllOutflow();
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
