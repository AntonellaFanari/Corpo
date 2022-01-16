using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class CreditService: ICreditService
    {
        private ICreditRepository _creditRepository;
        public CreditService(ICreditRepository creditRepository) 
        {
            _creditRepository = creditRepository;
          
        }

        public int Add(Credit credit)
        {
           
            var id = _creditRepository.Add(credit);
            return id;
        }

        public DomainResponse Update(Credit credit)
        {
            
            try
            {
                _creditRepository.Update(credit);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo cargar los creditos.");
            }
        }
    }
}
