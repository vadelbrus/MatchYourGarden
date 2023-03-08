using MatchYourGarden.DataModel;
using Microsoft.AspNetCore.Http;

namespace MatchYourGarden.Services.Contracts
{
    public interface IPlantService : IServiceBase<Plant>
    {
        public ServiceResponse Relate(Guid plantId, Guid gardenId);
        public ServiceResponse<Plant[]> GetAllByName(string name);
        public ServiceResponse<string> UploadImage(Guid plantId, IFormFile image);
    }
}