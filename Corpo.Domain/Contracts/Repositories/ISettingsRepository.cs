﻿using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface ISettingsRepository
    {
        void SaveAcces(List<RoleAcces> acces);
        List<RoleAcces> GetRoleAcces();
    }
}