using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Data.Repositories
{
    public class MemberRepository : IMemberRepository
    {
        private CorpoContext _context;

        public MemberRepository(CorpoContext context)
        {
            _context = context;
        }

        public int Add(Member member)
        {
            _context.Member.Add(member);
            _context.SaveChanges();
            var id = member.Id;
            return id;
        }

        public Member GetById(int id)
        {
            return _context.Member
                    .Include(x => x.Plan)
                    .Include(x => x.Account)
                    .Include(x=>x.Credit)
                    .FirstOrDefault(x => x.Id == id);
        }

        public Member GetByAccountId(int id)
        {
            return _context.Member
                    .Include(x => x.Plan)
                    .Include(x => x.Account)
                    .Include(x=> x.Credit)
                    .FirstOrDefault(x => x.AccountId == id);
        }

        public List<Member> GetAll()
        {
            var list = _context.Member
                    .Include(x => x.Plan)
                    .Include(x => x.Account)
                    .Include(x=>x.Credit)
                    .ToList();
            return list;
        }

        public int Update(Member member)
        {
            _context.Member.Update(member);
            _context.SaveChanges();
            return member.Id;
        }

        public int Delete(int id)
        {
            var member = _context.Member.Find(id);
            _context.Member.Remove(member);
            return member.AccountId;
        }

        public Member GetByEmail(string email)
        {
            return _context.Member.Find(email);
        }

        public int AddMedicalHistory(MedicalHistory medicalHistory)
        {
            _context.MedicalHistory.Add(medicalHistory);
            _context.SaveChanges();
            var id = medicalHistory.Id;
            return id;
        }

        public int UpdateMedicalHistory(MedicalHistory medicalHistory)
        {
            _context.MedicalHistory.Update(medicalHistory);
            _context.SaveChanges();
            return medicalHistory.Id;
        }

        public MedicalHistory GetMedicalHistoryByIdMember(int id)
        {
            return _context.MedicalHistory.FirstOrDefault(x=>x.MemberId == id);
        }

        public MedicalHistory GetMedicalHistoryById(int id)
        {
            return _context.MedicalHistory.Find(id);
        }

        public void DeleteMedicalHistory(int id)
        {
            var medicalHistory = _context.MedicalHistory.FirstOrDefault(x=>x.MemberId == id);
            medicalHistory.Injuries.Clear();
            _context.MedicalHistory.Remove(medicalHistory);
            _context.SaveChanges();
        }
        public int AddInjury(Injury injury)
        {
            _context.Injury.Add(injury);
            _context.SaveChanges();
            return injury.Id;
        }

        public void AddFile(File file)
        {
            _context.File.Add(file);
            _context.SaveChanges();
        }

        public List<Injury> GetAllInjuries(int id)
        {
            return _context.Injury.Where(x=>x.MedicalHistoryId == id).Include(x=>x.Files).ToList();
            
        }

        public int DeleteFile(int id)
        {
            var file = _context.File.Find(id);
            var idInjury = file.InjuryId;
            _context.File.Remove(file);
            _context.SaveChanges();
            return idInjury;
        }

        public void DeleteInjury(int id)
        {
            var injury = _context.Injury.Find(id);
            _context.Injury.Remove(injury);
            _context.SaveChanges();
        }

        public List<File> GetAllFiles(int id)
        {
            return _context.File.Where(x => x.InjuryId == id).ToList();
        }

    }
}
