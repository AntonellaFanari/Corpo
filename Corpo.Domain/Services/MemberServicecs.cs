using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class MemberService : IMemberService
    {
        private IMemberRepository _memberRepository;

        public MemberService(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public DomainResponse Add(Member member)
        {
            var day = member.BirthDate.Day;
            var month = member.BirthDate.Month;
            var year = member.BirthDate.Year;
            member.BirthDate = new DateTime(year, month, day);
            try
            {

                var id = _memberRepository.Add(member);
                return new DomainResponse
                {
                    Success = true,
                    Result = id
                };
            }
            catch (UniqueException ex)
            {
                return new DomainResponse(false, ex.Message, "El email ya existe.");
            };
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
    }
}
