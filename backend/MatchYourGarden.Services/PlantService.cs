using MatchYourGarden.DataModel;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;

namespace MatchYourGarden.Services
{
    public class PlantService : ServiceBase<Plant>, IPlantService
    {
        public PlantService (IDataContext dataContext) : base (dataContext)
        {
            
        }
    }
}