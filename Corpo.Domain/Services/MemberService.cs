using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Exceptions;
using Corpo.Domain.Models;
using Corpo.Domain.Models.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class MemberService : IMemberService
    {
        private IMemberRepository _memberRepository;
        private IAccountService _accountService;
        private IPlanRepository _planRepository;
        private ICreditService _creditService;
        private ISettingsRepository _settingsRepository;

        public MemberService(IMemberRepository memberRepository, IAccountService accountService,
        IPlanRepository planRepository, ICreditService creditService, ISettingsRepository settingsRepository)
        {
            _memberRepository = memberRepository;
            _accountService = accountService;
            _planRepository = planRepository;
            _creditService = creditService;
            _settingsRepository = settingsRepository;
        }

        public DomainResponse Add(MemberDto member)
        {
            var day = member.BirthDate.Day;
            var month = member.BirthDate.Month;
            var year = member.BirthDate.Year;

            var newAccount = new Account()
            {
                Email = member.Email,
                Password = GetHashString(member.Password),
                UserType = UserType.Member,
                VerificationCode = Guid.NewGuid(),
                Verified = false
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
                Instagram = member.Instagram,
                Facebook = member.Facebook,
                PlanId = member.PlanId,
                EntryDate = DateTime.Now
            };

            var setting = _settingsRepository.GetByName("firstDayPlan").Result;
            var planType = _planRepository.GetById(member.PlanId);
            var newCredit = new Credit();
            newCredit.InitialCredit = 0;
            newCredit.CreditConsumption = 0;
            newCredit.Negative = 0;
            if (planType.Type == PlanType.Group && setting.Value == "true")
            {
                newCredit.Expiration = DateTime.Now.AddHours(24);
                newCredit.FirstDay = "true";
            }else 
            {
                newCredit.Expiration = DateTime.Now;
                newCredit.FirstDay = "false";
            }
            try
            {
                var idAccount = _accountService.Add(newAccount);
                newMember.AccountId = idAccount;
                //_accountService.SendVerifiedEmail(newAccount.Email);
                var idCredit = _creditService.Add(newCredit);
                newMember.CreditId = idCredit;

                try
                {
                    int memberId = _memberRepository.Add(newMember);
                    return new DomainResponse
                    {
                        Success = true,
                        Result = new { id = memberId }
                    };
                }
                catch (Exception ex)
                {
                    _accountService.Delete(idAccount);
                    return new DomainResponse(false, ex.Message, "Error al guardar el usuario");
                }
            }
            catch (UniqueException ex)
            {
                return new DomainResponse(false, ex.Message, "El email ya se encuentra registrado.");
            }
     
        }

        public async Task<DomainResponse> GetById(int id)
        {
            var response = await _memberRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetAll()
        {
            var response = await _memberRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        //private Task UpdateStatus()
        //{
        //    _memberRepository.UpdateStatus();
        //}

        public async Task<DomainResponse> Update(int id, Member member)
        {
            var memberQuery = await _memberRepository.GetById(id);
            memberQuery.LastName = member.LastName;
            memberQuery.Name = member.Name;
            memberQuery.Phone = member.Phone;
            memberQuery.Address = member.Address;
            memberQuery.BirthDate = member.BirthDate;
            memberQuery.SocialSecurity = member.SocialSecurity;
            memberQuery.EmergencyPhone = member.EmergencyPhone;
            memberQuery.EmergencyContact = member.EmergencyContact;
            memberQuery.Instagram = member.Instagram;
            memberQuery.Facebook = member.Facebook;
            memberQuery.PlanId = memberQuery.PlanId;
            var idMember = await _memberRepository.Update(memberQuery);
            return new DomainResponse
            {
                Success = true,
                Result = new { id = idMember }
            };
        }

        public DomainResponse Delete(int id)
        {
            var accountId = _memberRepository.Delete(id);
            _accountService.Delete(accountId);
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> ByDateExpiration(DateTime from, DateTime to)
        {
            var response = await _memberRepository.ByDateExpiration(from, to);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> UpdateDueDate(CreditExpirationDto expiration)
        {

            var memberQuery = await _memberRepository.GetById(expiration.Id);
            var credit = memberQuery.Credit;
            credit.Expiration = expiration.Expiration;
            try
            {
                await _creditService.Update(credit);
                return new DomainResponse
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "No se pudo modificar la fecha de vencimiento.");
            }
        }

        public async Task<DomainResponse> GetPersonalized()
        {
            var response = await _memberRepository.GetPersonalized();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse AddMedicalHistory(int memberId, MedicalHistory medicalHistory)
        {
            try
            {
                medicalHistory.MemberId = memberId;
                int id = _memberRepository.AddMedicalHistory(medicalHistory);
                return new DomainResponse
                {
                    Success = true,
                    Result = new { id = id }
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "Error al guardar la historia médica");
            }

        }

        public DomainResponse UpdateMedicalHistory(int id, MedicalHistory medicalHistory)
        {
            try
            {
                var medicalHistoryUpdate = _memberRepository.GetMedicalHistoryById(id);
                medicalHistoryUpdate.Gender = medicalHistory.Gender;
                medicalHistoryUpdate.Period = medicalHistory.Period;
                medicalHistoryUpdate.Weight = medicalHistory.Weight;
                medicalHistoryUpdate.Allergies = medicalHistory.Allergies;
                medicalHistoryUpdate.HeartDisease = medicalHistory.HeartDisease;
                medicalHistoryUpdate.RespiratoryDisease = medicalHistory.RespiratoryDisease;
                medicalHistoryUpdate.SurgicalIntervention = medicalHistory.SurgicalIntervention;
                medicalHistoryUpdate.HabitualMedication = medicalHistory.HabitualMedication;
                medicalHistoryUpdate.Observations = medicalHistory.Observations;
                var medicalHistoryId = _memberRepository.UpdateMedicalHistory(medicalHistoryUpdate);
                return new DomainResponse
                {
                    Success = true,
                    Result = new { id = medicalHistoryId }
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "Error al modificar la historia médica");
            }
        }

        public DomainResponse GetMedicalHistoryById(int id)
        {
            var medicalhistory = _memberRepository.GetMedicalHistoryById(id);
            if (medicalhistory != null)
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = medicalhistory
                };
            }
            else
            {
                return new DomainResponse(false, "historia médica no encontrada", "no existe");
            }
        }
        public DomainResponse GetMedicalHistoryByIdMember(int id)
        {
            var medicalhistory = _memberRepository.GetMedicalHistoryByIdMember(id);
            if (medicalhistory != null)
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = medicalhistory
                };
            }
            else
            {
                return new DomainResponse(false, "historia médica no encontrada", "no existe");
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

        public async Task<DomainResponse> GetAge(int id)
        {
            var age = await this.GetAgeMember(id);
            return new DomainResponse
            {
                Success = true,
                Result = new { age = age }
            };
        }

        public async Task<int> GetAgeMember(int id)
        {
            var member = await _memberRepository.GetById(id);
            return (int)Math.Floor((DateTime.Now - member.BirthDate).TotalDays / 365.25D);
        }

        public async Task<DomainResponse> GetExistsMedicalHistory(int id)
        {
            var response = await _memberRepository.GetExistsMedicalHistory(id);
            if (response != null)
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = true
                };
            }
            else
            {
                return new DomainResponse
                {
                    Success = true,
                    Result = false
                };
            }
           
        }



        public DomainResponse AddInjury(Injury injury)
        {
            try
            {
                int injuryId = _memberRepository.AddInjury(injury);
                return new DomainResponse
                {
                    Success = true,
                    Result = new { id = injuryId }
                };
            }
            catch (Exception ex)
            {
                return new DomainResponse(false, ex.Message, "Error al guardar antecedentes de lesiones");
            }
        }

        public DomainResponse AddFile(int id, List<IFormFile> files)
        {
            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    var path = Path.Combine("wwwroot", "medical-check-up", file.FileName);
                    var newFile = new Models.File()
                    {
                        Path = Path.Combine("medical-check-up", file.FileName),
                        Name = file.FileName,
                        InjuryId = id
                    };
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    };

                    _memberRepository.AddFile(newFile);
                }
                return new DomainResponse { Success = true };

            }
            else
            {
                return new DomainResponse(false, "no hay estudios de lesiones para guardar", "No se seleccionaron archivos.");
            }
        }

        public DomainResponse GetAllInjuries(int id)
        {
            var response = _memberRepository.GetAllInjuries(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse GetAllFiles(int id)
        {
            var response = _memberRepository.GetAllFiles(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public DomainResponse DeleteFile(int id)
        {
            var idInjury = _memberRepository.DeleteFile(id);
            var files = _memberRepository.GetAllFiles(idInjury);
            if (files.Count == 0)
            {
                _memberRepository.DeleteInjury(idInjury);
            };
            return new DomainResponse
            {
                Success = true
            };
        }

        public async Task<DomainResponse> GetLevel(int id)
        {
            var response = await _memberRepository.GetLevel(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        public async Task<DomainResponse> GetLevelsHistory(int id)
        {
            var response = await _memberRepository.GetLevelsHistory(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }




        //public DomainResponse Download(string fileName)
        //{
        //    var FileVirtualPath = "wwwroot/studies" + fileName;
        //    File(FileVirtualPath, "application/force-download", Path.GetFileName(FileVirtualPath));
        //}
    }
}
