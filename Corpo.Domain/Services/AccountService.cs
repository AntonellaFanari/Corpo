using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class AccountService : IAccountService
    {
        private IAccountRepository _accountRepository;
        private IUserRepository _userRepository;
        private IMemberRepository _memberRepository;

        public AccountService(IAccountRepository accounRepository, IUserRepository userRepository, IMemberRepository memberRepository)
        {
            _accountRepository = accounRepository;
            _userRepository = userRepository;
            _memberRepository = memberRepository;
        }

        public int Add(Account account)
        {

            int id = _accountRepository.Add(account);
            return id;

        }

        public void Delete(int id)
        {
            _accountRepository.Delete(id);
        }

        public DomainResponse LogIn(Account account)
        {
            try
            {
                var accountQuery = _accountRepository.GetByEmail(account.Email);
                if (accountQuery != null)
                {
                    var password = this.GetHashString(account.Password);
                    if (password == accountQuery.Password)
                    {
                        if (accountQuery.UserType == UserType.User)
                        {
                            var userFound = _userRepository.GetByIdAccount(accountQuery.Id);
                            var accessUser = _userRepository.GetRoleAccess(userFound.RoleId);
                            var user = new UserAccessDto { User = userFound, Access = accessUser };
                            return new SuccessDomainResponse("user", user);
                        }
                        if (accountQuery.UserType == UserType.Member)
                        {
                            var member = _memberRepository.GetByAccountId(accountQuery.Id);
                            return new SuccessDomainResponse("member", member);
                        }
                        return null;
                    }
                    return new FailedDomainResponse("Contraseña incorrecta");

                }
                return new FailedDomainResponse("Email no registrado");
            }
            catch (Exception ex)
            {
                return new FailedDomainResponse("error: " + ex.Message + " " + ((ex.InnerException != null) ? ex.InnerException : ""));
            }
        }

        public async Task<DomainResponse> RecoverPassword(string email)
        
        {
            try
            {
                // Parte 1
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("antonellafanari94@gmail.com", "anto1994");
                // Parte 2
                MailMessage mm = new MailMessage();
                mm.IsBodyHtml = true;
                mm.Priority = MailPriority.Normal;
                mm.From = new MailAddress("antonellafanari94@gmail.com");
                mm.Subject = "Recuperación de contraseña";
                mm.Body = "<h1>Recuperar contraseña</h1>";
                mm.Body += "<p>Código de recuperación: 11111</p>";
                mm.To.Add(new MailAddress(email));
                smtp.Send(mm); // Enviar el mensaje
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {

                throw;
            }
      
        }

        public DomainResponse UpdateEmail(Account account)
        {
            try
            {
                var accountQuery = _accountRepository.GetById(account.Id);
                var password = this.GetHashString(account.Password);
                if (password == accountQuery.Password)
                {
                    accountQuery.Email = account.Email;
                    _accountRepository.UpdateEmail(accountQuery);
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
                var accountQuery = _accountRepository.GetById(account.Id);
                var password = this.GetHashString(account.Password);
                if (password == accountQuery.Password)
                {
                    var newPassword = this.GetHashString(account.NewPassword);
                    accountQuery.Password = newPassword;
                    _accountRepository.UpdatePassword(accountQuery);
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
