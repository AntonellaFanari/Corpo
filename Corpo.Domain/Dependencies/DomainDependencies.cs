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
        }
    }
}
