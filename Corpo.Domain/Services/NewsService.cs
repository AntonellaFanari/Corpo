using Corpo.Domain.Contracts.Repositories;
using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Corpo.Domain.Services
{
    public class NewsService : INewsService
    {
        private INewsRepository _newsRepository;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public DomainResponse Add(News news, IFormFileCollection files)
        {
            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    var path = Path.Combine("wwwroot", "news", file.FileName);
                    news.Path = Path.Combine("news", file.FileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    };

                    _newsRepository.Add(news);
                }
                return new DomainResponse { Success = true };

            }
            else
            {
                return new DomainResponse(false, "no hay archivo para guardar", "No se seleccionó archivo .");
            }
        }

        public DomainResponse Delete(int id)
        {
            _newsRepository.Delete(id);
            return new DomainResponse
            {
                Success = true
            };
        }

        async public Task<DomainResponse> GetAll()
        {
            var response = await _newsRepository.GetAll();
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> GetById(int id)
        {
            var response = await _newsRepository.GetById(id);
            return new DomainResponse
            {
                Success = true,
                Result = response
            };
        }

        async public Task<DomainResponse> Update(News news, IFormFileCollection files)
        {
            var newsQuery = await _newsRepository.GetById(news.Id);
            newsQuery.Title = news.Title;
            newsQuery.From = news.From;
            newsQuery.To = news.To;
          
            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    var path = Path.Combine("wwwroot", "news", file.FileName);
                    newsQuery.Path = Path.Combine("news", file.FileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    };

                    _newsRepository.Update(newsQuery);
                }
                return new DomainResponse { Success = true };

            }
            else
            {
                _newsRepository.Update(newsQuery);
                return new DomainResponse { Success = true};
            }
        }
    }
}
