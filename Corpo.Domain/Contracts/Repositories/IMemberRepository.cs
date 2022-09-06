using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IMemberRepository
    {
        Task<List<MemberListDto>> GetAll();
        Task<Member> GetById(int id);
        Member GetByAccountId(int id);
        Member GetByEmail(string email);
        int Add(Member member);
        Task<int> Update(Member member);
        int Delete(int id);
        Task<List<MemberListDto>> ByDateExpiration(DateTime from, DateTime to);
        Task<List<Member>> GetPersonalized();
        int AddMedicalHistory(MedicalHistory historyMedical);
        MedicalHistory GetMedicalHistoryByIdMember(int id);
        MedicalHistory GetMedicalHistoryById(int id);
        int UpdateMedicalHistory(MedicalHistory medicalHistory);
        void DeleteMedicalHistory(int id);
        Task<MedicalHistory> GetExistsMedicalHistory(int id);
        int AddInjury(Injury injury);
        void AddFile(File file);
        List<Injury> GetAllInjuries(int id);
        List<File> GetAllFiles(int id);
        int DeleteFile(int id);
        void DeleteInjury(int id);
        Task<PhysicalLevel> GetLevel(int id);
        Task<List<PhysicalLevel>> GetLevelsHistory(int id);
        //Task UpdateStatus();
    }
}
