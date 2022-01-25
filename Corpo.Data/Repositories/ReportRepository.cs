using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private CorpoContext _context;

        public ReportRepository(CorpoContext context)
        {
            _context = context;
        }

        public async Task<MembersStatisticsDto> MembersStatisticsAsync()
        {
            var date = DateTime.Now;
            var inactiveMembers = await _context.Credit.Where(x => x.Expiration < date).CountAsync();
            var active = await _context.Credit.Where(x => x.Expiration > date).CountAsync();
            var closeToInactive = await _context.Credit.Where(x => x.Expiration > date && x.Expiration < date.AddDays(7)).CountAsync();
            var news = await _context.Member.Where(x => x.EntryDate.Month == date.Month).CountAsync();
            var fistMonthInactive = await _context.Credit.Where(x => (DateTime.Compare(x.Expiration, date.AddDays(-30)) < 0) && (DateTime.Compare(x.Expiration, date.AddDays(-60)) > 0)).CountAsync();
            var secondMonthInactive = await _context.Credit.Where(x => (DateTime.Compare(x.Expiration, date.AddDays(-60)) < 0) && (DateTime.Compare(x.Expiration, date.AddDays(-90)) > 0)).CountAsync();
            var thirdMonthInactive = await _context.Credit.Where(x => (DateTime.Compare(x.Expiration, date.AddDays(-90)) < 0)).CountAsync();
            var reEntrants = await _context.Member.Where(x => x.ReEntryDate != null).CountAsync();
            
            return new MembersStatisticsDto
            {
                InactiveMembers = inactiveMembers,
                Active = active,
                CloseToInactive = closeToInactive,
                News = news,
                FistMonthInactive = fistMonthInactive,
                secondMonthInactive = secondMonthInactive,
                ThirdMonthInactive = thirdMonthInactive,
                ReEntrants = reEntrants
            };
        }

        public async Task<List<MemberViewModel>> MembersStatisticsDetailAsync(string reportType)
        {
            var date = DateTime.Now;
            var members = new List<MemberViewModel>();
            switch (reportType)
            {
                case "inactiveMembers":
                    members = await _context.Member.Include(x => x.Credit).Where(x => x.Credit.Expiration < date).Select(x => new MemberViewModel
                    {
                        Id = x.Id,
                        LastName = x.LastName,
                        Name = x.Name,
                        NamePlan = x.Plan.Name,
                        Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                        Expiration = x.Credit.Expiration,
                        BirthDate = x.BirthDate
                    }).ToListAsync();
                    break;
                case "active":
                    members = await _context.Member.Include(x => x.Credit).Where(x => x.Credit.Expiration > date).Select(x => new MemberViewModel
                    {
                        Id = x.Id,
                        LastName = x.LastName,
                        Name = x.Name,
                        NamePlan = x.Plan.Name,
                        Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                        Expiration = x.Credit.Expiration,
                        BirthDate = x.BirthDate
                    }).ToListAsync();
                    break;
                case "closeToInactive":
                    members = await _context.Member.Include(x => x.Credit)
                        .Where(x => x.Credit.Expiration > date && x.Credit.Expiration < date.AddDays(7)).Select(x => new MemberViewModel
                    {
                        Id = x.Id,
                        LastName = x.LastName,
                        Name = x.Name,
                        NamePlan = x.Plan.Name,
                        Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                        Expiration = x.Credit.Expiration,
                        BirthDate = x.BirthDate
                    }).ToListAsync();
                    break;
                case "news":
                    members = await _context.Member.Where(x => x.EntryDate.Month == date.Month).Select(x => new MemberViewModel
                    {
                        Id = x.Id,
                        LastName = x.LastName,
                        Name = x.Name,
                        NamePlan = x.Plan.Name,
                        Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                        Expiration = x.Credit.Expiration,
                        BirthDate = x.BirthDate
                    }).ToListAsync();
                    break;
                case "fistMonthInactive":
                    members = await _context.Member.Include(x => x.Credit)
                        .Where(x => (DateTime.Compare(x.Credit.Expiration, date.AddDays(-30)) < 0) &&
                                    (DateTime.Compare(x.Credit.Expiration, date.AddDays(-60)) > 0))
                        .Select(x => new MemberViewModel
                        {
                            Id = x.Id,
                            LastName = x.LastName,
                            Name = x.Name,
                            NamePlan = x.Plan.Name,
                            Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                            Expiration = x.Credit.Expiration,
                            BirthDate = x.BirthDate
                        }).ToListAsync();
                    break;
                case "secondMonthInactive":
                    members = await _context.Member.Include(x => x.Credit)
                        .Where(x => (DateTime.Compare(x.Credit.Expiration, date.AddDays(-60)) < 0) &&
                                    (DateTime.Compare(x.Credit.Expiration, date.AddDays(-90))>0))
                        .Select(x => new MemberViewModel
                        {
                            Id = x.Id,
                            LastName = x.LastName,
                            Name = x.Name,
                            NamePlan = x.Plan.Name,
                            Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                            Expiration = x.Credit.Expiration,
                            BirthDate = x.BirthDate
                        }).ToListAsync();
                    break;
                case "thirdMonthInactive":
                    members = await _context.Member.Include(x => x.Credit)
                        .Where(x => (DateTime.Compare(x.Credit.Expiration, date.AddDays(-90)) < 0))
                        .Select(x => new MemberViewModel
                        {
                            Id = x.Id,
                            LastName = x.LastName,
                            Name = x.Name,
                            NamePlan = x.Plan.Name,
                            Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                            Expiration = x.Credit.Expiration,
                            BirthDate = x.BirthDate
                        }).ToListAsync();
                    break;
                case "reEntrants":
                    members = await _context.Member.Where(x => x.ReEntryDate != null)
                        .Select(x => new MemberViewModel
                        {
                            Id = x.Id,
                            LastName = x.LastName,
                            Name = x.Name,
                            NamePlan = x.Plan.Name,
                            Credit = (x.Credit.InitialCredit - x.Credit.CreditConsumption),
                            Expiration = x.Credit.Expiration,
                            BirthDate = x.BirthDate
                        }).ToListAsync();
                    break;
                default:
                    break;
            };

            return members;
        }
    }
}
