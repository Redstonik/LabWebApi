namespace LabWebAPI.Contracts.Services
{
    public interface ICreateDirectory
    {
        Task CreateDirectoryAsync(string folderPath);
    }
}
