using Corpo.Domain.Contracts.Services;
using Corpo.Domain.Models;
using Corpo.Web.Controllers.ExtensionMethods;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Corpo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet("getAll")]
        async public Task<ActionResult<News>> GetAll()
        {
            var response = await _newsService.GetAll();
            return Ok(response);
        }

        [HttpPost("add")]
        public ActionResult Add(List<IFormFile> file)
        {
            var message = HttpContext.Request;
            var title = HttpContext.Request.Form["title"].ToString();
            var from = HttpContext.Request.Form["from"].ToString();
            var to = HttpContext.Request.Form["to"].ToString();
            var files = HttpContext.Request.Form.Files;
            var news = new News();
            news.Title = title;
            news.From = DateTime.Parse(from);
            news.To = DateTime.Parse(to);
            var response = _newsService.Add(news, files);
            return this.ToActionResult(response);
        }

        [HttpGet("getById")]
        async public Task<ActionResult<News>> GetById(int id)
        {
            var response = await _newsService.GetById(id);
            return Ok(response);
        }

        [HttpPut("Update")]
        async public Task<ActionResult> Update(int id, List<IFormFile> file)
        {
            var message = HttpContext.Request;
            var title = HttpContext.Request.Form["title"].ToString();
            var from = HttpContext.Request.Form["from"].ToString();
            var to = HttpContext.Request.Form["to"].ToString();
            var files = HttpContext.Request.Form.Files;
            var news = new News();
            news.Id = id;
            news.Title = title;
            news.From = DateTime.Parse(from);
            news.To = DateTime.Parse(to);
            var response = await _newsService.Update(news, files);
            return this.ToActionResult(response);
        }

        [HttpDelete("delete")]
        public ActionResult Delete(int id)
        {
            var response = _newsService.Delete(id);
            return Ok(response);
        }

        [HttpGet("download")]
        public async Task<FileStreamResult> Download(string fileName)
        {
            var memory = new MemoryStream();
            try
            {
                var path = Path.Combine("wwwroot", fileName);
                using (var stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                return new FileStreamResult(memory, GetContentType(path))
                {
                    FileDownloadName = path
                };
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        private string GetContentType(string path)
        {
            var ext = Path.GetExtension(path).ToLowerInvariant();
            if (_mimeTypes.ContainsKey(ext)) return _mimeTypes[ext];
            return "application/octet-stream";
        }

        private static Dictionary<string, string> _mimeTypes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { ".txt", "text/plain" },
            { ".pdf", "application/pdf" },
            { ".doc", "application/vnd.ms-word" },
            { ".docx", "application/vnd.ms-word" },
            { ".xls", "application/vnd.ms-excel" },
            { ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            { ".png", "image/png" },
            { ".jpg", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".gif", "image/gif" },
            { ".csv", "text/csv" }
        };
    }
}
