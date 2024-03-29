﻿using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IAnamnesisService
    {
        Task<DomainResponse> Add(int id, Anamnesis anamnesis);
        Task<DomainResponse> GetByMemberId(int id);
        Task<DomainResponse> GetLevel(int id);
    }
}
