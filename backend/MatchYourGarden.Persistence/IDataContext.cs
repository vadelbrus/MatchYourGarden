using MatchYourGarden.DataModel;
using Microsoft.EntityFrameworkCore;

namespace MatchYourGarden.Persistence
{
    public interface IDataContext
    {
        public DbSet<Plant> Plants { get; }
        public DbSet<Garden> Gardens { get; }
        public DbSet<T> Entities<T>() where T : EntityBase;
        public int SaveChanges();
    }
}
