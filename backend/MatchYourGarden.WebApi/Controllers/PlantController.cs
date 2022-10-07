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

        [HttpGet("get/{id}")]
        public IActionResult Get(Guid id)
        {
            var response = _plantService.GetEntity(id);
            return ApiResponse<Plant, PlantDto>(response);
        }

        [HttpGet("getall/{page}/{perPage}")]
        public IActionResult GetAll(int page, int perPage)
        {
            var response = _plantService.GetAll(page, perPage);
            var totalCount = _plantService.GetCount();
            return ApiPaginatedResultResponse<Plant[], PlantListItemDto[]>(response, page, perPage, totalCount);
        }
    }
}