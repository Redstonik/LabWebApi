namespace LabWebAPI.Contracts.Data.Entities
{
    public class Product : IBaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime PublicationDate { get; set; }
        public decimal Price { get; set; }
        public string UserWhoCreatedId { get; set; }
        public User UserWhoCreated { get; set; } = null!;
        public ICollection<Comment> Comments
        {
            get; set;
        }
    }
}
