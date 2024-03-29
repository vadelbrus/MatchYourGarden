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
    public class GardenController : BaseController
    {
        private readonly IGardenService _gardenService;
        
        public GardenController(ILogger<GardenController> logger, IDataContext dataContext, IGardenService service, IMapper mapper) : base(logger, dataContext, mapper)
        {
            _gardenService = service;
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(Guid id)
        {
            var response = _gardenService.GetEntity(id);
            return ApiResponse<Garden, GardenDto>(response);
        }

        [HttpGet("getall/{page}/{perPage}")]
        public IActionResult GetAll(int page, int perPage)
        {
            var response = _gardenService.GetAll(page, perPage);
            var totalCount = _gardenService.GetCount();
            return ApiPaginatedResultResponse<Garden[], GardenListItemDto[]>(response, page, perPage, totalCount);
        }

        [HttpGet("getallbyname/{name}")]
        public IActionResult GetAllByName(string name)
        {
            var response = _gardenService.GetAllByName(name);
            return ApiResponse<Garden[], GardenListItemDto[]>(response);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] GardenDto garden)
        {
            var entity = Map<GardenDto, Garden>(garden);
            var response = _gardenService.Create(entity);
            return ApiResponse<Garden, GardenDto>(response);
        }
    }
}