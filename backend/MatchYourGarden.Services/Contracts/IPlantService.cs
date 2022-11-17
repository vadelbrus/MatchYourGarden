using MatchYourGarden.DataModel;

namespace MatchYourGarden.Services.Contracts
{
    public interface IPlantService : IServiceBase<Plant>
    {
        public ServiceResponse Relate(Guid plantId, Guid gardenId);
    }
}