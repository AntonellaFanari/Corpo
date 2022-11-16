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
    public class WodMemberService: IWodMemberService
    {
        private IWodMemberRepository _wodMemberRepository;
        private IPeriodizationRepository _periodizationRepository;
        private IWodTemplateRepository _wodTemplateRepository;
        private IWeeklyTemplateRepository _weeklyTemplateRepository;

        public WodMemberService(IWodMemberRepository wodMemberRepository, IPeriodizationRepository periodizationRepository,
            IWodTemplateRepository wodTemplateRepository, IWeeklyTemplateRepository weeklyTemplateRepository)
        {
            _wodMemberRepository = wodMemberRepository;
            _periodizationRepository = periodizationRepository;
            _wodTemplateRepository = wodTemplateRepository;
            _weeklyTemplateRepository = weeklyTemplateRepository;
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _wodMemberRepository.GetById(id);
            return new DomainResponse()
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Add(int id, int weekNumber, Periodization periodization)
        {
            try
            {
                
                var templates = _weeklyTemplateRepository.GetById(id).Result.WeeklyWodTemplates;
                for (int i = 0; i < templates.Count; i++)
                {
                    var wodMember = new WodMember();
                    wodMember.Goal = templates[i].WodTemplate.Goal;
                    wodMember.MemberId = periodization.MemberId;
                    wodMember.PeriodizationId = periodization.Id;
                    wodMember.WeekNumber = weekNumber;
                    wodMember.WodNumber = (i + 1);
                    wodMember.IntensityType = periodization.PeriodizationWeeks.Find(x => x.WeekNumber == weekNumber).IntensityType;
                    wodMember.Intensity = periodization.PeriodizationWeeks.Find(x => x.WeekNumber == weekNumber).Intensity;
                    wodMember.WeeklyTemplateId = id;
                    wodMember.WodGroupsMember = new List<WodGroupMember>();
                    foreach (var wodGroup in templates[i].WodTemplate.WodGroups)
                    {
                        var wodGroupMember = new WodGroupMember();
                        wodGroupMember.ExerciseId = wodGroup.ExerciseId;
                        wodGroupMember.ModalityId = wodGroup.ModalityId;
                        wodGroupMember.Detail = wodGroup.Detail;
                        wodGroupMember.Rounds = wodGroup.Rounds;
                        wodGroupMember.Series = wodGroup.Series;
                        wodGroupMember.Time = wodGroup.Time;
                        wodGroupMember.UnitType = wodGroup.UnitType;
                        wodGroupMember.Units = wodGroup.Units;
                        wodGroupMember.GroupIndex = wodGroup.GroupIndex;
                        wodGroupMember.IntensityType = wodGroup.IntensityType;
                        wodGroupMember.IntensityValue = wodGroup.IntensityValue;
                        wodGroupMember.StaggeredType = wodGroup.StaggeredType;
                        wodGroupMember.StaggeredValue = wodGroup.StaggeredValue;
                        wodGroupMember.TimeWork = wodGroup.TimeWork;
                        wodGroupMember.TimeRest = wodGroup.TimeRest;
                        wodGroupMember.PauseBetweenRounds = wodGroup.PauseBetweenRounds;
                        wodGroupMember.PauseBetweenExercises = wodGroup.PauseBetweenExercises;
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
            var periodization = _periodizationRepository.GetValidByMemberId(id);
            if (periodization != null)
            {
                var response = await _wodMemberRepository.GetAllWodMember(id, periodization.Id);
                return new DomainResponse
                {
                    Success = true,
                    Result = response
                };
            }
            else
            {
                return new DomainResponse(false, "no existe una periodización vigente.", "No existe periodización vigente.");
            }
        }

        public async Task<DomainResponse> GetAllWodMemberWeek(int id)
        {
            var periodization = await _periodizationRepository.GetValidByMemberId(id);
            if (periodization != null)
            {
                DateTime startDate = DateTime.Today;
                DateTime stopDate = startDate.AddDays(1).AddTicks(-1);

                DayOfWeek referenceDayOfWeek = startDate.DayOfWeek;

                int diffDaysFromMonday = DayOfWeek.Monday - referenceDayOfWeek;
                if (diffDaysFromMonday > 0) { diffDaysFromMonday -= 7; }
                DateTime from = startDate.AddDays(diffDaysFromMonday);

                int diffDaysToSunday = (DayOfWeek.Sunday - referenceDayOfWeek);
                if (diffDaysToSunday < 0) { diffDaysToSunday += 7; }
                DateTime to = stopDate.AddDays(diffDaysToSunday);
                var periodizationWeek = await _periodizationRepository.GetPeriodizationWeekByPeriodizationIdByFromTo(periodization.Id, from, to);
                object response;
                if (periodizationWeek != null)
                {
                    response = await _wodMemberRepository.GetByWeekNumber(periodizationWeek.WeekNumber, periodization.Id);
                 
                }
                else
                {
                    response = null;
                }
                return new DomainResponse
                {
                    Success = true,
                    Result = response
                };


            }
            else
            {
                return new DomainResponse(false, "no existe una periodización vigente.", "No existe periodización vigente.");
            }
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
