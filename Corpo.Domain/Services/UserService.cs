using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Corpo.Domain.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<User> GetAll()
        {

            return _userRepository.GetAll();
        }

        public List<Role> GetRoles()
        {
            return _userRepository.GetRoles();
        }

        public DomainResponse Add(User user)
        {
            var day = user.BirthDate.Day;
            var month = user.BirthDate.Month;
            var year = user.BirthDate.Year;
            user.BirthDate = new DateTime(year, month, day);
            try
            {

                _userRepository.Add(user);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (UniqueException ex)
            {
                return new DomainResponse(false, ex.Message, "El email ya existe.");
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
    }
}
