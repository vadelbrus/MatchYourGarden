﻿using MatchYourGarden.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MatchYourGarden.Persistence
{
    public class DataContext : DbContext, IDataContext
    {
        public DbSet<Plant> Plants { get; set; }
        public DbSet<PlantImage> PlantImage { get; set; }
        public DbSet<Garden> Gardens { get; set; }
        public DbSet<T> Entities<T>() where T : EntityBase => base.Set<T>();

        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Plant>().HasIndex(p => p.Name).IsUnique();
            modelBuilder.Entity<Plant>().HasIndex(p => p.LatinName).IsUnique();
            modelBuilder.Entity<Garden>().HasIndex(p => p.Name).IsUnique();

            modelBuilder.Entity<Plant>().Navigation(e => e.Gardens).AutoInclude();
            modelBuilder.Entity<Plant>().Navigation(e => e.Images).AutoInclude();
        }

        public override int SaveChanges()
        {
            SetEntityDates();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetEntityDates();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            SetEntityDates();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override EntityEntry Entry(object entity)
        {
            return base.Entry(entity);
        }

        private void SetEntityDates()
        {
            var entities = ChangeTracker.Entries<EntityBase>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified).Select(e => e.Entity);
            var currentDate = DateTime.UtcNow;

            foreach (var obj in entities)
            {
                var entry = this.Entry(obj);
                if (entry.State == EntityState.Added)
                {
                    obj.DateCreated = currentDate;
                }

                obj.DateUpdated = currentDate;
            }
        }        
    }
}
