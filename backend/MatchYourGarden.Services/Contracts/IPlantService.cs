using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using Microsoft.AspNetCore.Http;

namespace MatchYourGarden.Services.Contracts
{
    public interface IPlantService : IServiceBase<Plant>
    {
        public ServiceResponse Relate(Guid plantId, Guid gardenId);
        public ServiceResponse<Plant[]> GetAllByName(string name);
        public ServiceResponse<ImageDto> UploadImage(Guid plantId, IFormFile image);
    }
}