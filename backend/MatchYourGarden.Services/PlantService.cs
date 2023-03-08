using MatchYourGarden.Common;
using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MatchYourGarden.Services
{
    public class PlantService : ServiceBase<Plant>, IPlantService
    {
        private IFileUploadService _fileUploadService;

        public PlantService (IDataContext dataContext, IFileUploadService fileUploadService) : base (dataContext)
        {
            _fileUploadService = fileUploadService;
        }

        public ServiceResponse<Plant[]> GetAllByName(string name)
        {
            if (name == null || name.Length < 3)
            {
                return new ServiceResponse<Plant[]>("Name should be at least 3 letters long.", 404);
            }

            var matchingPlants = _dataContext.Plants.Where(g => g.Name.Contains(name)).ToArray();
            return new ServiceResponse<Plant[]>(matchingPlants);
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
    
        public ServiceResponse<ImageDto> UploadImage(Guid plantId, IFormFile image)
        {
            using (var ms = new MemoryStream())
            {
                image.CopyTo(ms);
                var bytes = ms.ToArray();
                var hash = bytes.MD5();
                var fileName = $"{hash}.{image.ContentType.ContentTypeToFileExtension()}";

                var plant = _dataContext.Plants.Find(plantId);

                if (plant == null)
                {
                    return new ServiceResponse<ImageDto>($"Plant {plantId} does not exist in the database.", 404);
                }

                if (plant.Images.Any(i => i.Name.Equals(fileName)))
                {
                    return new ServiceResponse<ImageDto>($"Image already exists.", 409);
                }

                var response = _fileUploadService.Upload($"plants/{plantId}", fileName, image);
                
                // if file uploaded we store that information in the DB
                if (response.IsSuccess())
                {
                    try
                    {
                        var plantImage = new PlantImage(fileName);
                        plant.Images.Add(plantImage);
                        _dataContext.SaveChanges();
                        response.Data.Id = plantImage.Id;
                    }
                    catch (Exception e)
                    {
                        return new ServiceResponse<ImageDto>(e.Message, 500);
                    }
                }

                return response;
            }            
        }
    }
}