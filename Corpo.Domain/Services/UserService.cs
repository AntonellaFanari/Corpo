using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
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
    class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IAccountRepository _accountRepository;

        public UserService(IUserRepository userRepository, IAccountRepository accountRepository)
        {
            _userRepository = userRepository;
            _accountRepository = accountRepository;
        }

        public List<User> GetAll()
        {

            return _userRepository.GetAll();
        }

        public List<Role> GetRoles()
        {
            return _userRepository.GetRoles();
        }

        public DomainResponse Add(UserDto user)
        {
            var day = user.BirthDate.Day;
            var month = user.BirthDate.Month;
            var year = user.BirthDate.Year;
            user.BirthDate = new DateTime(year, month, day);
            var newAccount = new Account()
            {
                Email = user.Email,
                Password = GetHashString(user.Password),
                UserType = UserType.User
            };
            var newUser = new User()
            {
                LastName = user.LastName,
                Name = user.Name,
                BirthDate = user.BirthDate,
                Address = user.Address,
                Phone = user.Phone,
                RoleId = user.RoleId
            };
            try
            {
                int id = _accountRepository.Add(newAccount);
                newUser.AccountId = id;
                _userRepository.Add(newUser);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (UniqueException ex)
            {
                return new DomainResponse(false, ex.Message, "El email ya se encuentra registrado.");
            }
        }


        public User GetById(int id)
        {
            return _userRepository.GetById(id);
        }

        public void Delete(int id)
        {
            _userRepository.Delete(id);
        }

        public DomainResponse Update(int id, User user)
        {
            _userRepository.Update(id, user);
            return new DomainResponse
            {
                Success = true,
                Message = "Usuario modificado"
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
