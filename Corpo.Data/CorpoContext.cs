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
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
            builder.Entity<Member>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
        public DbSet<User> User { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Member> Member { get; set; }
        public DbSet<HistoryMedical> HistoryMedical { get; set; }
        public DbSet<Injury> Injury { get; set; }
        public DbSet<File> File { get; set; }
        public DbSet<RoleAcces> RoleAcces { get; set; }
    }
}
