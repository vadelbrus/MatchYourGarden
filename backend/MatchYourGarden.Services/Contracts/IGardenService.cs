using MatchYourGarden.DataModel;

namespace MatchYourGarden.Services.Contracts
{
    public interface IGardenService : IServiceBase<Garden>
    {
        ServiceResponse<Garden[]> GetAllByName(string name);
    }
}