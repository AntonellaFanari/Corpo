using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class MemberService : IMemberService
    {
        private IMemberRepository _memberRepository;
        private IAccountRepository _accountRepository;

        public MemberService(IMemberRepository memberRepository, IAccountRepository accountRepository)
        {
            _memberRepository = memberRepository;
            _accountRepository = accountRepository;
        }

        public DomainResponse Add(MemberDto member)
        {
            var day = member.BirthDate.Day;
            var month = member.BirthDate.Month;
            var year = member.BirthDate.Year;
            member.BirthDate = new DateTime(year, month, day);
            var newAccount = new Account()
            {
                Email = member.Email,
                Password = GetHashString(member.Password),
                UserType = UserType.Member
            };
            var newMember = new Member()
            {
                LastName = member.LastName,
                Name = member.Name,
                BirthDate = member.BirthDate,
                Address = member.Address,
                SocialSecurity = member.SocialSecurity,
                Phone = member.Phone,
                EmergencyContact = member.EmergencyContact,
                EmergencyPhone = member.EmergencyPhone,
                PlanId = member.PlanId,
                Instagram = member.Instagram,
                Facebook = member.Facebook
            };
            try
            {
                int id = _accountRepository.Add(newAccount);
                newMember.AccountId = id;
                _memberRepository.Add(newMember);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (UniqueException ex)
            {
                return new DomainResponse(false, ex.Message,  "El email ya se encuentra registrado.");
            }
        }

        public Member GetById(int id)
        {
            return _memberRepository.GetById(id);
        }

        public DomainResponse GetAll()
        {
            var respuesta = _memberRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = respuesta
            };
        }

        private byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        private string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));
            return sb.ToString();
        }
    }
}
