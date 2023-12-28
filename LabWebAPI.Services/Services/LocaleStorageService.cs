using LabWebAPI.Contracts.Services;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Hosting;
using LabWebAPI.Contracts.APImodels;
using LabWebAPI.Contracts.Exceptions;

namespace LabWebAPI.Services.Services
{
    public class LocaleStorageService : ILocaleStorageService
    {
        private readonly IHostEnvironment _hostEnvironment;
        public LocaleStorageService(IHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }
        public async Task<string> AddFileAsync(Stream stream, string folderPath, string fileName)
        {
            if (stream == null)
            {
                throw new FileIsEmptyException(fileName);
            }
            await CreateDirectoryAsync(folderPath);
            string uploadsFolder = Path.Combine(_hostEnvironment.EnvironmentName, folderPath);
            string uniqueFileName = CreateName(fileName, uploadsFolder);
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);
            var dbPath = Path.Combine(folderPath, uniqueFileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await stream.CopyToAsync(fileStream);
            }
            return "Local" + ":" + dbPath;
        }
        public Task CreateDirectoryAsync(string folderPath)
        {
            string path = Path.Combine(_hostEnvironment.EnvironmentName, folderPath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            return Task.CompletedTask;
        }
        public async Task DeleteFileAsync(string path)
        {
            string deletePath = Path.Combine(_hostEnvironment.EnvironmentName, path);
            var file = new FileInfo(deletePath);
            if (file.Exists)
            {
                await Task.Factory.StartNew(() => file.Delete());
            }
        }
        public Task<DownloadFile> GetFileAsync(string dbPath)
        {
            string path = Path.Combine(_hostEnvironment.EnvironmentName, dbPath);
            if (!File.Exists(path))
            {
                throw new FileNotFoundException(path);
            }
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(path, out string contentType))
            {
                throw new CannotGetFileContentTypeException(path);
            }
            DownloadFile fileInfo = new DownloadFile()
            {
                ContentType = contentType,
                Name = Path.GetFileName(path),
                Content = new FileStream(path, FileMode.Open)
            };
            return Task.FromResult(fileInfo);
        }
        private string CreateName(string fileName, string folderPath)
        {
            var path = Path.Combine(folderPath, fileName);
            bool isFileExsist = File.Exists(path);
            if (isFileExsist)
            {
                return $"{Path.GetFileNameWithoutExtension(path)}_" +
                $"{DateTime.Now.ToString("yyyyMMddTHHmmssfff")}" +
                $"{Path.GetExtension(path)}";
            }
            return fileName;
        }
    }

}
