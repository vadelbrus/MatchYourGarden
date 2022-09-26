using MatchYourGarden.DataModel;
using Microsoft.EntityFrameworkCore;

namespace MatchYourGarden.Persistence
{
    public interface IDataContext
    {
        public DbSet<Plant> Plants { get; }
        public DbSet<Plant> Gardens { get; }
    }
}
