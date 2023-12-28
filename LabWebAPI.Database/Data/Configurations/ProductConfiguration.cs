using LabWebAPI.Contracts.Data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Database.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder
            .HasKey(x => x.Id);
            builder
            .Property(x => x.Name)
            .HasMaxLength(100)
            .IsRequired();
            builder
            .Property(x => x.Description)
            .HasMaxLength(500)
            .IsRequired();
            builder
            .Property(x => x.Price)
            .IsRequired();
            builder
            .Property(x => x.PublicationDate)
            .HasColumnType("datetime")
            .IsRequired();
            builder
            .HasOne(x => x.UserWhoCreated)
            .WithMany(x => x.Products)
            .HasForeignKey(x => x.UserWhoCreatedId)
            .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
