using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class ClassService: IClassService
    {
        private IClassRepository _classRepository;

        public ClassService(IClassRepository classRepository)
        {
            _classRepository = classRepository;
        }

        public DomainResponse Add(Class newClass)
        {
            try
            {
                var classExists = _classRepository.GetAll().FirstOrDefault(x => x.Name.ToLower() == newClass.Name.ToLower());
                if (classExists == null)
                {
                    _classRepository.Add(newClass);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "La clase ya existe", "La clase ya existe");
                }
                 
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo agregar la clase.");
            }
        }

        public DomainResponse GetAll()
        {
            var response = _classRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }
        public DomainResponse GetById(int id)
        {
            var response = _classRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse Delete(int id)
        {
            _classRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        public DomainResponse Update(int id, Class classEdit)
        {

            try
            {
                var classExists = _classRepository.GetAll().FirstOrDefault(x => x.Name.ToLower() == classEdit.Name.ToLower());
                if (classExists== null)
                {
                    var classQuery = _classRepository.GetById(id);
                    classQuery.Name = classEdit.Name;
                    classQuery.Personalized = classEdit.Personalized;
                    _classRepository.Update(classQuery);
                    return new DomainResponse
                    {
                        Success = true
                    };
                }
                else
                {
                    return new DomainResponse(false, "La clase ya existe", "La clase ya existe");
                }

            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la clase.");
            }
        }
    }
}
