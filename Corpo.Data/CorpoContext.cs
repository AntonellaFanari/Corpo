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
        public DbSet<OrderProducts> OrderProducts { get; set; }
        public DbSet<Shift> Shift { get; set; }
    }
}
