using MatchYourGarden.DataModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace MatchYourGarden.Persistence
{
    public interface IDataContext
    {
        public DbSet<Plant> Plants { get; }
        public DbSet<Garden> Gardens { get; }
        public DbSet<T> Entities<T>() where T : EntityBase;
        public EntityEntry Entry(object entity);
        public int SaveChanges();
    }
}
