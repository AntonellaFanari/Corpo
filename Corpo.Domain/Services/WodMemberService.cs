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
    public class WodMemberService: IWodMemberService
    {
        private IWodMemberRepository _wodMemberRepository;

        public WodMemberService(IWodMemberRepository wodMemberRepository)
        {
            _wodMemberRepository = wodMemberRepository;
        }

        public async Task<DomainResponse> Add(WodMember wodMember)
        {
            try
            {
                var id = await _wodMemberRepository.Add(wodMember);
                return new DomainResponse
                {
                    Success = true,
                    Result = new {id}
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo agregar el Wod");
            }
        }

        public async Task<DomainResponse> GetAllWodMember(int id, DateTime from, DateTime to)
        {
            var response = await _wodMemberRepository.GetAllWodMember(id, from, to);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetAllWodMemberWeek(int id)
        {

            DateTime from = DateTime.Today.AddDays(-1 * ((int)(DateTime.Today.DayOfWeek)-1));
            DateTime to = DateTime.Today.AddDays(-1 * ((int)(DateTime.Today.DayOfWeek) - 7));
            var response = await _wodMemberRepository.GetAllWodMember(id, from, to);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Delete(int id)
        {
            await _wodMemberRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> Update(WodMember wodMember)
        {
            try
            {
                var wodMemberQuery = await _wodMemberRepository.GetById(wodMember.Id);
                wodMemberQuery.Name = wodMember.Name;
                wodMemberQuery.Detail = wodMember.Detail;
                wodMemberQuery.Date = wodMember.Date;
                wodMemberQuery.MemberId = wodMember.MemberId;
                wodMemberQuery.WodGroupsMember = wodMember.WodGroupsMember;
                await _wodMemberRepository.Update(wodMemberQuery);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                return new DomainResponse(false, ex.Message, "No se pudo modificar el Wod");
            }
        }

        public async Task<DomainResponse> AddRate(int id, int rate)
        {
            var wodMember = await _wodMemberRepository.GetById(id);
            wodMember.Rate = rate;
            try
            {
                await _wodMemberRepository.Update(wodMember);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar la valorización.");
            }
        }
    }
}
