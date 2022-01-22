﻿using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IAttendanceService
    {
        DomainResponse Add(Attendance attendance);
        Task<DomainResponse> GetAllByIdShift(int id);
        Task<DomainResponse> CancelReservation(int id, Credit credit);
        Task<DomainResponse> GetAllReservations(int id);

    }
}