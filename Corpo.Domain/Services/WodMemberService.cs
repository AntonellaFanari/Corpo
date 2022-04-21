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
        private IWodTemplateRepository _wodTemplateRepository;

        public WodMemberService(IWodMemberRepository wodMemberRepository, IPeriodizationRepository periodizationRepository,
            IWodTemplateRepository wodTemplateRepository)
        {
            _wodMemberRepository = wodMemberRepository;
            _periodizationRepository = periodizationRepository;
            _wodTemplateRepository = wodTemplateRepository;
        }

        public async Task<DomainResponse> Add(int id, int weekNumber, Periodization periodization)
        {
            try
            {
                
                var wodTemplate = await _wodTemplateRepository.GetById(id);
                for (int i = 0; i < periodization.Trainings; i++)
                {
                    var wodMember = new WodMember();
                    wodMember.Goal = wodTemplate.Goal;
                    wodMember.MemberId = periodization.MemberId;
                    wodMember.PeriodizationId = periodization.Id;
                    wodMember.WeekNumber = weekNumber;
                    wodMember.WodNumber = (i + 1);
                    wodMember.IntensityType = periodization.PeriodizationWeeks.Find(x => x.WeekNumber == weekNumber).IntensityType;
                    wodMember.Intensity = periodization.PeriodizationWeeks.Find(x => x.WeekNumber == weekNumber).Intensity;
                    wodMember.WodGroupsMember = new List<WodGroupMember>();
                    foreach (var wodGroup in wodTemplate.WodGroups)
                    {
                        var wodGroupMember = new WodGroupMember();
                        wodGroupMember.ExerciseId = wodGroup.ExerciseId;
                        wodGroupMember.ModalityId = wodGroup.ModalityId;
                        wodGroupMember.Detail = wodGroup.Detail;
                        wodGroupMember.Units = wodGroup.Units;
                        wodGroupMember.GroupIndex = wodGroup.GroupIndex;
                        wodGroupMember.Mode = wodGroup.Mode;
                        wodGroupMember.Value = wodGroup.Value;
                        wodMember.WodGroupsMember.Add(wodGroupMember);
                    }
                    await _wodMemberRepository.Add(wodMember);
                }
                periodization.PeriodizationWeeks.FirstOrDefault(x => x.WeekNumber == weekNumber).Planned = "true";
                await _periodizationRepository.Update(periodization);

                return new DomainResponse
                {
                    Success = true,
                    Result = new {id = id}
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
                wodMemberQuery.Goal = wodMember.Goal;
                wodMemberQuery.PeriodizationId = wodMember.PeriodizationId;
                wodMemberQuery.Rate = wodMember.Rate;
                wodMemberQuery.WeekNumber = wodMember.WeekNumber;
                wodMemberQuery.WodNumber = wodMember.WodNumber;
                wodMemberQuery.Attended = wodMember.Attended;
                wodMemberQuery.Detail = wodMember.Detail;
                wodMemberQuery.MemberId = wodMember.MemberId;
                wodMemberQuery.IntensityType = wodMember.IntensityType;
                wodMemberQuery.Intensity = wodMember.Intensity;
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

        public async Task<DomainResponse> UpdateRate(int id, int rate)
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
                return new DomainResponse(false, ex.Message, "No se pudo modificar la valorización.");
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

        public async Task<DomainResponse> GetByPeriodizationIdWeekNumber(int id, int weekNumber)
        {
            var response = await _wodMemberRepository.GetByWeekNumber(weekNumber, id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> DeleteWods(int periodizationId, int weekNumber)
        {
            var wods = await _wodMemberRepository.GetByWeekNumber(weekNumber, periodizationId);
            foreach (var wod in wods)
            {
                await _wodMemberRepository.Delete(wod.Id);
            }
            var periodization = await _periodizationRepository.GetById(periodizationId);
            periodization.PeriodizationWeeks.Find(x => x.WeekNumber == weekNumber).Planned = "false";
            await _periodizationRepository.Update(periodization);
            return new DomainResponse
            {
                Success = true,
                Result = periodization
            };
        }

        public async Task<DomainResponse> GetAttendanceByYear(int year, int memberId)
        {
            var response = await _wodMemberRepository.GetAttendanceByYear(year, memberId);
            if (response != null)
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = response
                };
            }
            else
            {
                return new DomainResponse(false, "", "No registra periodizaciones para este año.");
            }
        }

        public async Task<DomainResponse> UpdateRest(int id, int rest)
        {
            var wodMember = await _wodMemberRepository.GetById(id);
            wodMember.Rest = rest;
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
                return new DomainResponse(false, ex.Message, "No se pudo modificar el descanso.");
            }
        }
    }
}
