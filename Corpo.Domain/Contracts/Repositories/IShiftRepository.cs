﻿using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IShiftRepository
    {
        Task<List<Shift>> GetAll(DateTime fromDay, TimeSpan fromHour, DateTime toDay, TimeSpan toHour, int classId);
        void Add(Shift shift);
        Task<Shift> GetById(int id);
        Task Update(Shift shift);
        void Delete(int id);
    }
}
