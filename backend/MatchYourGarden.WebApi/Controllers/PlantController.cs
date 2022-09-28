using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services;
using MatchYourGarden.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace MatchYourGarden.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantController : BaseController
    {
        private readonly IPlantService _plantService;
        
        public PlantController(ILogger<PlantController> logger, IDataContext dataContext, IPlantService service, IMapper mapper) : base(logger, dataContext, mapper)
        {
            _plantService = service;
        }

        [HttpGet(Name = "Get")]
        public IActionResult Get(Guid id)
        {
            var response = _plantService.GetEntity(id);
            return ApiResponse<Plant, PlantDto>(response);
        }
    }
}