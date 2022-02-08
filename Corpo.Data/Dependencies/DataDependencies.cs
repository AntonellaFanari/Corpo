using Corpo.Data.Repositories;
using Corpo.Domain.Contracts.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Dependencies
{
     public static class DataDependencies
    {
        public static void AddDataConfiguration(this IServiceCollection services, string connection)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IMemberRepository, MemberRepository>();
            services.AddTransient<ISettingsRepository, SettingsRepository>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ISaleRepository, SaleRepository>();
            services.AddTransient<IPlanRepository, PlanRepository>();
            services.AddTransient<IClassRepository, ClassRepository>();
            services.AddTransient<IShiftRepository, ShiftRepository>();
            services.AddTransient<IPurchaseRepository, PurchaseRepository>();
            services.AddTransient<IOutflowRepository, OutflowRepository>();
            services.AddTransient<IExerciseRepository, ExerciseRepository>();
            services.AddTransient<IBalanceRepository, BalanceRepository>();
            services.AddTransient<IFeeRepository, FeeRepository>();
            services.AddTransient<IPromotionRepository, PromotionRepository>();
            services.AddTransient<ICreditRepository, CreditRepository>();
            services.AddTransient<IWithdrawalRepository, WithdrawalRepository>();
            services.AddTransient<IAttendanceRepository, AttendanceRepository>();
            services.AddTransient<INewsRepository, NewsRepository>();
            services.AddTransient<IReportRepository, ReportRepository>();
            services.AddTransient<IWodTemplateRepository, WodTemplateRepository>();
            services.AddTransient<IIncomeRepository, IncomeRepository>();
            services.AddTransient<ICashRepository, CashRepository>();
            services.AddTransient<IWodMemberRepository, WodMemberRepository>();
            services.AddTransient<IModalityRepository, ModalityRepository>();
            services.AddTransient<IPeriodizationRepository, PeriodizationRepository>();
            services.AddDbContext<CorpoContext>(options => options.UseSqlServer(connection));
        }
    }
}
