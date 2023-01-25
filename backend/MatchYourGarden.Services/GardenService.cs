using MatchYourGarden.DataModel;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;
using System;

namespace MatchYourGarden.Services
{
    public class GardenService : ServiceBase<Garden>, IGardenService
    {
        public GardenService(IDataContext dataContext) : base(dataContext)
        {

        }

        public ServiceResponse<Garden[]> GetAllByName(string name)
        {
            if (name == null || name.Length < 3)
            {
                return new ServiceResponse<Garden[]>("Name should be at least 3 letters long.", 404);
            }

            var matchingGardens = _dataContext.Gardens.Where(g => g.Name.Contains(name)).ToArray();
            return new ServiceResponse<Garden[]>(matchingGardens);
        }
    }
}