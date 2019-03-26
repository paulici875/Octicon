using Microsoft.EntityFrameworkCore;

namespace OcticonApi.Core.Domain.Repository
{
    public partial class OcticonDbContext : DbContext
    {
        public virtual DbSet<Parking> Parking { get; set; }
        public virtual DbSet<ParkingSpot> ParkingSpot { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<UserInfo> UserInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=localhost\SQLEXPRESS;Database=OcticonDb;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Parking>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ParkingSpot>(entity =>
            {
                entity.HasOne(d => d.Parking)
                    .WithMany(p => p.ParkingSpot)
                    .HasForeignKey(d => d.ParkingId)
                    .HasConstraintName("FK__ParkingSp__Parki__4D94879B");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.Property(e => e.ChargingType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DateTime).HasColumnType("datetime");

                entity.Property(e => e.LicencePlate)
                    .IsRequired()
                    .HasMaxLength(7)
                    .IsUnicode(false);

                entity.Property(e => e.ReservationType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.ParkingSpot)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.ParkingSpotId)
                    .HasConstraintName("FK__Reservati__Parki__5165187F");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reservation)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Reservati__UserI__5070F446");
            });

            modelBuilder.Entity<UserInfo>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(13)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
        }
    }
}
