using LabWebAPI.Contracts.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace LabWebAPI.Database.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
             .HasKey(x => x.Id);
            builder
            .Property(x => x.Name)
            .HasMaxLength(50)
            .IsRequired();
            builder
            .Property(x => x.Surname)
            .HasMaxLength(50)
            .IsRequired();
            builder
            .Property(x => x.Email)
            .HasMaxLength(50)
            .IsRequired();
            builder
            .Property(x => x.Birthday)
           .HasColumnType("datetime")
            .IsRequired();
            builder
            .Property(x => x.ImageAvatarUrl)
            .IsRequired(false);
        }
    }
}
