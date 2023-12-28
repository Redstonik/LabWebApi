using LabWebAPI.Contracts.APImodels;

namespace LabWebAPI.Contracts.Services
{
    public interface IFileService
    {
        Task<string> AddFileAsync(Stream stream, string folderPath, string fileName);
        Task<DownloadFile> GetFileAsync(string path);
        Task DeleteFileAsync(string path);
    }
}
