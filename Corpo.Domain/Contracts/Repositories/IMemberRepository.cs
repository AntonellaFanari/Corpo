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
        int Add(Member member);
    }
}
