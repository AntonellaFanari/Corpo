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
    public class ReportService : IReportService
    {
        private IReportRepository _reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        public async Task<DomainResponse> MemberStatisticsAsync()
        {
            var response = await _reportRepository.MembersStatisticsAsync();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> MembersStatisticsDetailAsync(string reportType)
        {
            var response = await _reportRepository.MembersStatisticsDetailAsync(reportType);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetMembersActivesByPlan(string planName)
        {
            var response = await _reportRepository.GetMembersActivesByPlan(planName);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
    }
}
