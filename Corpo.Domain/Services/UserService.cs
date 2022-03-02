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

        public async Task<DomainResponse> GetRoles()
        {
            var roles = await _userRepository.GetRoles();
            //if (roles == null)
            //{
            //    List<Role>newRoles = new List<Role>();
            //    newRoles.Add(new Role() { Name = "Administrador"});
            //    newRoles.Add(new Role() { Name = "Profesor" });
            //    newRoles.Add(new Role() { Name = "Marketing" });
               
            //    try
            //    {
            //        foreach (var role in newRoles)
            //        {
            //          await _userRepository.AddRole(role);
            //        }
            //        var list = _userRepository.GetRoles();
            //        return new DomainResponse
            //        {
            //            Success = true,
            //            Result = list
            //        };
            //    }
            //    catch (Exception ex)
            //    {
            //        return new DomainResponse(false, ex.Message, "No se pudieron agregar los roles.");
            //    }
            //}
            //else
            //{
                return new DomainResponse
                {
                    Success = true,
                    Result = roles
                };
            //}

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
                try
                {
                    _userRepository.Add(newUser);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                catch (Exception ex)
                {
                    _accountRepository.Delete(id);
                    return new DomainResponse(false, ex.Message, "Error al guardar el usuario");
                }
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
        public DomainResponse GetAllByNameRole(string role)
        {
            var response = _userRepository.GetAllByNameRole(role);
            if (response.Count > 0)
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = response
                };
            }
            else
            {
                return new DomainResponse(false, "", "no existen usuarios del tipo Profesor");
            }
         
        }
        public DomainResponse Delete(int id, string email)
        {
            var account = _accountRepository.GetByEmail(email);
            _userRepository.Delete(id);
            _accountRepository.Delete(account.Id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse Update(int id, User user)
        {

            var userQuery = _userRepository.GetById(id);
            userQuery.LastName = user.LastName;
            userQuery.Name = user.Name;
            userQuery.Phone = user.Phone;
            userQuery.RoleId = user.RoleId;
            userQuery.Address = user.Address;
            userQuery.BirthDate = user.BirthDate;
            _userRepository.Update(userQuery);
            return new DomainResponse
            {
                Success = true
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
