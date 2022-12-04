using MatchYourGarden.DataModel;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace MatchYourGarden.Services
{
    public class PlantService : ServiceBase<Plant>, IPlantService
    {
        public PlantService (IDataContext dataContext) : base (dataContext)
        {
            
        }

        public ServiceResponse Relate(Guid plantId, Guid gardenId)
        {
            var plant = _dataContext.Plants.Include(p => p.Gardens).FirstOrDefault(p => p.Id == plantId);

            if (plant is null)
            {
                return new ServiceResponse($"Plant {plantId} not found.", 404);
            }

            var garden = _dataContext.Gardens.Find(gardenId);

            if (garden is null)
            {
                return new ServiceResponse($"Garden {gardenId} not found.", 404);
            }

            if (plant.Gardens.FirstOrDefault(g => g.Id == gardenId) != null)
            {
                return new ServiceResponse($"Relation cannot be created, because it already exists.", 409);
            }

            try
            {
                plant.Gardens.Add(garden);
                var change = _dataContext.SaveChanges();
                return new ServiceResponse();
            }
            catch
            {
                return new ServiceResponse("Server error. Cannot save to the database.", 500);
            }            
        }
    }
}