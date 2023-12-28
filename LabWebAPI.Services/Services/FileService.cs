using LabWebAPI.Contracts.Services;
using LabWebAPI.Contracts.APImodels;


namespace LabWebAPI.Services.Services
{
    public class FileService : IFileService
    {
        private readonly ILocaleStorageService _localeStorageService;
        public FileService(ILocaleStorageService localeStorageService)
        {
            _localeStorageService = localeStorageService;
        }
        public async Task<string> AddFileAsync(Stream stream, string folderPath, string fileName)
        {
            return await _localeStorageService.AddFileAsync(stream, folderPath, fileName);
        }
        public async Task DeleteFileAsync(string path)
        {
            var storedFilePath = path.Split(":");
            await _localeStorageService.DeleteFileAsync(storedFilePath[1]);
        }
        public async Task<DownloadFile> GetFileAsync(string dbPath)
        {
            DownloadFile file = null;
            var storedFilePath = dbPath.Split(":");
            file = await _localeStorageService.GetFileAsync(storedFilePath[1]);
            return file;
        }
    }

}
