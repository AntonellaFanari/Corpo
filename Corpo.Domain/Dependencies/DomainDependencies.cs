using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Dependencies
{
 public static class DomainDependencies
    {
        public static void AddDomainConfiguration(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IMemberService, MemberService>();
            services.AddTransient<ISettingsService, SettingsService>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<ISaleService, SaleService>();
            services.AddTransient<IPlanService, PlanService>();
            services.AddTransient<IClassService, ClassService>();
            services.AddTransient<IShiftService, ShiftService>();
            services.AddTransient<IPurchaseService, PurchaseService>();
            services.AddTransient<IOutflowService, OutflowService>();
            services.AddTransient<IExerciseService, ExerciseService>();
            services.AddTransient<IBalanceService, BalanceService>();
            services.AddTransient<IFeeService, FeeService>();
            services.AddTransient<IPromotionService, PromotionService>();
            services.AddTransient<ICreditService, CreditService>();
            services.AddTransient<IWithdrawalService, WithdrawalService>();
            services.AddTransient<IAttendanceService, AttendanceService>();
            services.AddTransient<INewsService, NewsService>();
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<IWodTemplateService, WodTemplateService>();
            services.AddTransient<IIncomeService, IncomeService>();
            services.AddTransient<ICashService, CashService>();
            services.AddTransient<IWodMemberService, WodMemberService>();
            services.AddTransient<IModalityService, ModalityService>();
            services.AddTransient<IPeriodizationService, PeriodizationService>();
            services.AddTransient<IMonthlyGoalService, MonthlyGoalService>();
            services.AddTransient<IWeeklyGoalService, WeeklyGoalService>();
            services.AddTransient<ITrainingSystemService, TrainingSystemService>();
            services.AddTransient<ITestTemplateService, TestTemplateService>();
        }
    }
}
