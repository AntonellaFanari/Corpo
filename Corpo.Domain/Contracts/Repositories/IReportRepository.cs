using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IReportRepository
    {
        Task<MembersStatisticsDto> MembersStatisticsAsync();
        Task<List<MemberViewModel>> MembersStatisticsDetailAsync(string reportType);
        Task<List<MembersActivesPlanDto>> GetMembersActivesByPlan(string planName);
    }
}
