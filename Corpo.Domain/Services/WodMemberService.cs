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
        private IPeriodizationRepository _periodizationRepository;

        public WodMemberService(IWodMemberRepository wodMemberRepository, IPeriodizationRepository periodizationRepository)
        {
            _wodMemberRepository = wodMemberRepository;
            _periodizationRepository = periodizationRepository;
        }

        public async Task<DomainResponse> Add(WodMember wodMember)
        {
            try
            {
                var id = await _wodMemberRepository.Add(wodMember);
                var wodsNumber = await _wodMemberRepository.GetByPeriodizationIdByWeekNumber(wodMember.PeriodizationId, wodMember.WeekNumber);
                var periodization = await _periodizationRepository.GetById(wodMember.PeriodizationId);
                if (wodsNumber == periodization.Trainings)
                {
                    periodization.PeriodizationWeeks.FirstOrDefault(x => x.WeekNumber == wodMember.WeekNumber).Planned = "true";
                    await _periodizationRepository.Update(periodization);
                }
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
                wodMemberQuery.Detail = wodMember.Detail;
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
            wodMember.Attended = "true";
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

        public async Task<DomainResponse> GetAttended(int id, int memberId)
        {
            var response = await _wodMemberRepository.GetAttended(id, memberId);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetByWeekNumber(int weekNumber, int memberId)
        {
            var periodization = await _periodizationRepository.GetValidByMemberId(memberId);
            var response = await _wodMemberRepository.GetByWeekNumber(weekNumber, periodization.Id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
