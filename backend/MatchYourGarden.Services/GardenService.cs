using MatchYourGarden.DataModel;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;

namespace MatchYourGarden.Services
{
    public class GardenService : ServiceBase<Garden>, IGardenService
    {
        public GardenService(IDataContext dataContext) : base(dataContext)
        {

        }
    }
}