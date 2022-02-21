using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Services
{
    public interface IMemberService
    {
        DomainResponse GetAll();
        Member GetById(int id);
        DomainResponse Add(MemberDto member);
        DomainResponse Update(int id, Member member);
        DomainResponse Delete(int id);
        Task<DomainResponse> ByDateExpiration(DateTime from, DateTime to);
        DomainResponse UpdateDueDate(CreditExpirationDto expiration);
        Task<DomainResponse> GetPersonalized();
        DomainResponse AddMedicalHistory(int memberId, MedicalHistory medicalHistory);
        DomainResponse UpdateMedicalHistory(int id, MedicalHistory medicalHistory);
        DomainResponse GetMedicalHistoryById(int id);
        DomainResponse GetMedicalHistoryByIdMember(int id);
        DomainResponse GetAge(int id);
        DomainResponse AddInjury(Injury injury);
        DomainResponse AddFile(int id, List<IFormFile> files);
        DomainResponse GetAllInjuries(int id);
        DomainResponse GetAllFiles(int id);
        DomainResponse DeleteFile(int id);
        //DomainResponse Download(string fileName);
    }
}
