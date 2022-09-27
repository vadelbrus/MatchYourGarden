using MatchYourGarden.DataModel;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services;
using MatchYourGarden.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace MatchYourGarden.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantController : BaseController
    {
        private readonly IPlantService _plantService;
        
        public PlantController(ILogger<PlantController> logger, IDataContext dataContext, IPlantService service) : base(logger, dataContext)
        {
            _plantService = service;
        }

        [HttpGet(Name = "Get")]
        public ServiceResponse<Plant> Get(Guid id)
        {
            return _plantService.GetEntity(id);
        }
    }
}