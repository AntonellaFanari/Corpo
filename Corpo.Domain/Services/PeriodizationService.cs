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
    public class PeriodizationService : IPeriodizationService
    {
        private IPeriodizationRepository _periodizationRepository;

        public PeriodizationService(IPeriodizationRepository periodizationRepository)
        {
            _periodizationRepository = periodizationRepository;
        }

        public async Task<DomainResponse> Add(Periodization periodization)
        {
            try
            {
                var periodizationExists = await _periodizationRepository.GetExists(periodization.Year, periodization.Month, periodization.MemberId);
                var validPeriodization = await _periodizationRepository.GetValidByMemberId(periodization.MemberId);
                if (periodizationExists != null)
                {
                    return new DomainResponse(false, "No se puede guardar la periodización.", "Ya existe una periodización registrada para este periodo.");
                }
                else
                {
                    DateTime startDate = DateTime.Today;
                    DateTime stopDate = startDate.AddDays(1).AddTicks(-1);

                    DayOfWeek referenceDayOfWeek = startDate.DayOfWeek;

                    int diffDaysFromMonday = DayOfWeek.Monday - referenceDayOfWeek;
                    if (diffDaysFromMonday > 0) { diffDaysFromMonday -= 7; }
                    DateTime mondayOfTheWeek = startDate.AddDays(diffDaysFromMonday);

                    int diffDaysToSunday = (DayOfWeek.Sunday - referenceDayOfWeek);
                    if (diffDaysToSunday < 0) { diffDaysToSunday += 7; }
                    DateTime sundayOfTheWeek = stopDate.AddDays(diffDaysToSunday);
                    foreach (var week in periodization.PeriodizationWeeks)
                    {
                        switch (week.WeekNumber)
                        {
                            case 1:
                                week.From = mondayOfTheWeek;
                                week.To = sundayOfTheWeek;
                                break;
                            case 2:
                                week.From = mondayOfTheWeek.AddDays(7);
                                week.To = sundayOfTheWeek.AddDays(7);
                                break;
                            case 3:
                                week.From = mondayOfTheWeek.AddDays(14);
                                week.To = sundayOfTheWeek.AddDays(14);
                                break;
                            case 4:
                                week.From = mondayOfTheWeek.AddDays(21);
                                week.To = sundayOfTheWeek.AddDays(21);
                                break;
                            default:
                                break;
                        }
                    }
                    periodization.Valid = true;
                    await _periodizationRepository.Add(periodization);
                    if (validPeriodization != null)
                    {
                        validPeriodization.Valid = false;
                        await _periodizationRepository.Update(validPeriodization);
                    };
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar la periodización.");
            }
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _periodizationRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetPeriodizationWeek(int id)
        {
            var response = await _periodizationRepository.GetByPeriodizationWeek(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetByYear(int year, int id)
        {
            if (year == 0)
            {
                year = DateTime.Now.Year;
            }
            var response = await _periodizationRepository.GetByYear(year, id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetValidByMemberId(int id)
        {
            var response = await _periodizationRepository.GetValidByMemberId(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> Update(int id, Periodization periodization)
        {

            try
            {
                var periodizationExists = await _periodizationRepository.GetExists(periodization.Year, periodization.Month, periodization.MemberId);
                if (periodizationExists != null && periodizationExists.Id != periodization.Id)
                {
                    return new DomainResponse(false, "No se puede guardar la periodización.", "Ya existe una periodización registrada para este periodo.");
                }
                else
                {
                    var periodizationQuery = await _periodizationRepository.GetById(id);
                    periodizationQuery.Goal = periodization.Goal;
                    periodizationQuery.MemberId = periodization.MemberId;
                    periodizationQuery.Valid = periodization.Valid;
                    periodizationQuery.Trainings = periodization.Trainings;
                    periodizationQuery.Year = periodization.Year;
                    periodizationQuery.Month = periodization.Month;
                    periodizationQuery.Volume = periodization.Volume;
                    periodizationQuery.TrainingSystem = periodization.TrainingSystem;
                    periodizationQuery.PeriodizationWeeks = periodization.PeriodizationWeeks;
                    await _periodizationRepository.Update(periodizationQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la periodización.");
            }
        }

        public async Task<DomainResponse> GetYears(int id)
        {
            var response = await _periodizationRepository.GetYears(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
