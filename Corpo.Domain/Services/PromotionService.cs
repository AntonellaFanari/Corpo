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
    public class PromotionService: IPromotionService
    {
        private IPromotionRepository _promotionRepository;

        public PromotionService(IPromotionRepository promotionRepository)
        {
            _promotionRepository = promotionRepository;
        }

        public DomainResponse Add(Promotion promotion)
        {
            try
            {
                _promotionRepository.Add(promotion);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo guardar la promoción.");
            }
        }

        public DomainResponse Delete(int id)
        {
            _promotionRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse GetAll()
        {
            var response = _promotionRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetById(int id)
        {
            var response = _promotionRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse Update(int id, Promotion promotion)
        {
            try
            {
                var promotionQuery = _promotionRepository.GetById(id);
                promotionQuery.Name = promotion.Name;
                promotionQuery.DiscountMainMember = promotion.DiscountMainMember;
                promotionQuery.From = promotion.From;
                promotionQuery.To = promotion.To;
                _promotionRepository.Update(promotionQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo modificar la promoción.");
            }
        }
    }
}
