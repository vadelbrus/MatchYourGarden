using MatchYourGarden.DataModel;
using Microsoft.EntityFrameworkCore;

namespace MatchYourGarden.Persistence
{
    public class DataContext : DbContext, IDataContext
    {
        public DbSet<Plant> Plants { get; set; }
        public DbSet<Garden> Gardens { get; set; }
        public DbSet<T> Entities<T>() where T : EntityBase => base.Set<T>();

        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {
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
