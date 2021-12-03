﻿using Corpo.Data.Repositories;
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
            services.AddDbContext<CorpoContext>(options => options.UseSqlServer(connection));
        }
    }
}
