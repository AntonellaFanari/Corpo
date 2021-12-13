using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class AccountService: IAccountService
    {
        private IAccountRepository _accounRepository;
        private IUserRepository _userRepository;
        private IMemberRepository _memberRepository;

        public AccountService(IAccountRepository accounRepository, IUserRepository userRepository, IMemberRepository memberRepository)
        {
            _accounRepository = accounRepository;
            _userRepository = userRepository;
            _memberRepository = memberRepository;
        }

        public DomainResponse Add(Account account)
        {
            throw new NotImplementedException();
        }

        public DomainResponse LogIn(Account account)
        {
            var accountQuery = _accounRepository.GetByEmail(account.Email);
            if (accountQuery != null)
            {
                var password = this.GetHashString(account.Password); 
                if (password == accountQuery.Password)
                {
                    if (accountQuery.UserType == UserType.User)
                    {
                        var userFound = _userRepository.GetByIdAccount(accountQuery.Id);
                        var accessUser = _userRepository.GetRoleAccess(userFound.RoleId);
                        var user = new UserAccessDto{ User = userFound, Access = accessUser};
                        return new SuccessDomainResponse("user", user);
                    }
                    if (accountQuery.UserType == UserType.Member)
                    {
                        var member = _memberRepository.GetByAccountId(accountQuery.Id);
                        return new SuccessDomainResponse("member", member);
                    } return null;
                }
                return new FailedDomainResponse("Contraseña incorrecta");

            }
            return new FailedDomainResponse("Email no registrado");
        }

        public DomainResponse UpdateEmail(Account account)
        {
            try
            {
                var accountQuery = _accounRepository.GetById(account.Id);
                var password = this.GetHashString(account.Password);
                if (password == accountQuery.Password)
                {
                    accountQuery.Email = account.Email;
                    _accounRepository.UpdateEmail(accountQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "La contraseña no es correcta", "No se pudo modificar el email.");
                }
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar el email");
            }
        }

        public DomainResponse UpdatePassword(AccountDto account)
        {
            try
            {
                var accountQuery = _accounRepository.GetById(account.Id);
                var password = this.GetHashString(account.Password);
                if (password == accountQuery.Password)
                {
                    var newPassword = this.GetHashString(account.NewPassword);
                    accountQuery.Password = newPassword;
                    _accounRepository.UpdatePassword(accountQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "La contraseña actual no es correcta", "No se pudo modificar la contraseña.");
                }
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la contraseña.");
            }
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
