namespace LabWebAPI.Database.Data
{
    public class DownloadFile : IDisposable
    {
        public string Name { get; set; }
        public string ContentType { get; set; }
        public Stream Content { get; set; }
        public void Dispose()
        {
            if (Content != null)
            {
                Content.Dispose();
            }
        }
    }
}
