using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Contracts.Repositories
{
    public interface IMemberRepository
    {
        List<Member> GetAll();
        Member GetById(int id);
        Member GetByEmail(string email);
        int Add(Member member);
        int Update(Member member);
        int Delete(int id);
        int AddMedicalHistory(MedicalHistory historyMedical);
        MedicalHistory GetMedicalHistoryByIdMember(int id);
        MedicalHistory GetMedicalHistoryById(int id);
        int UpdateMedicalHistory(MedicalHistory medicalHistory);
        void DeleteMedicalHistory(int id);
        int AddInjury(Injury injury);
        void AddFile(File file);
        List<Injury> GetAllInjuries(int id);
        List<File> GetAllFiles(int id);
        int DeleteFile(int id);
        void DeleteInjury(int id);
    }
}
