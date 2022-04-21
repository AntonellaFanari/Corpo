using Corpo.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data
{
    public class CorpoContext: DbContext
    {
        public CorpoContext(DbContextOptions<CorpoContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Account>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Member> Member { get; set; }
        public DbSet<MedicalHistory> MedicalHistory { get; set; }
        public DbSet<Injury> Injury { get; set; }
        public DbSet<File> File { get; set; }
        public DbSet<RoleAccess> RoleAccess { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Plan> Plan { get; set; }
        public DbSet<Class> Class { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Sale> Sale { get; set; }
        public DbSet<DetailsSale> DetailsSale { get; set; }
        public DbSet<CancelSale> CancelSale { get; set; }
        public DbSet<Purchase> Purchase { get; set; }
        public DbSet<Shift> Shift { get; set; }
        public DbSet<DetailPurchase> DetailPurchase { get; set; }
        public DbSet<Outflow> Outflow { get; set; }
        public DbSet<OutflowType> OutflowType { get; set; }
        public DbSet<Exercise> Exercise { get; set; }
        public DbSet<CategoryExercise> CategoryExercise { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<BalanceToPay> BalanceToPay { get; set; }
        public DbSet<Fee> Fee { get; set; }
        public DbSet<Promotion> Promotion { get; set; }
        public DbSet<Credit> Credit { get; set; }
        public DbSet<PromotionAnotherMember> PromotionAnotherMember { get; set; }
        public DbSet<WithdrawalName> WithdrawalName { get; set; }
        public DbSet<Withdrawal> Withdrawal { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<WodTemplate> WodTemplate { get; set; }
        public DbSet<WodGroup> WodGroup { get; set; }
        public DbSet<Modality> Modality { get; set; }
        public DbSet<Cash> Cash { get; set; }
        public DbSet<Income> Income { get; set; }
        public DbSet<MonthlyCash> MonthlyCash { get; set; }
        public DbSet<WodMember> WodMember { get; set; }
        public DbSet<WodGroupMember> WodGroupMember { get; set; }
        public DbSet<Periodization> Periodization { get; set; }
        public DbSet<PeriodizationWeek> PeriodizationWeek { get; set; }
        public DbSet<GeneralSetting> GeneralSetting { get; set; }
        public DbSet<MonthlyGoal> MonthlyGoal { get; set; }
        public DbSet<WeeklyGoal> WeeklyGoal { get; set; }
        public DbSet<TrainingSystem> TrainingSystem { get; set; }
        public DbSet<TestTemplate> TestTemplate { get; set; }
        public DbSet<TestExercise> TestExercise { get; set; }
        public DbSet<TestMember> TestMember { get; set; }
        public DbSet<TestHeartRateExercise> TestHeartRateExercise { get; set; }
        public DbSet<TestRepetitionExercise> TestRepetitionExercise { get; set; }
        public DbSet<TestVideoExercise> TestVideoExercise { get; set; }
    }
}
