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

        [HttpPost("create")]
        public IActionResult Create([FromBody] PlantDto plant)
        {
            var entity = Map<PlantDto, Plant>(plant);

            // this is done, to let EF know that all gardens already exist in the DB
            foreach (var garden in entity.Gardens)
            {
                _dataContext.Entry(garden).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
            }
            
            var response = _plantService.Create(entity);
            return ApiResponse<Plant, PlantDto>(response);
        }

        [HttpPost("uploadimage")]
        public IActionResult UploadImage([FromForm(Name = "id")] Guid id, [FromForm(Name = "image")] IFormFile image)
        {
            var response = _plantService.UploadImage(id, image);
            return ApiResponse<ImageDto>(response);
        }

        [HttpDelete("deleteimage/{id}")]
        public IActionResult DeleteImage(Guid id)
        {
            var response = _plantService.DeleteImage(id);
            return ApiResponse(response);
        }

        [HttpGet("getallbyname/{name}")]
        public IActionResult GetAllByName(string name)
        {
            var response = _plantService.GetAllByName(name);
            return ApiResponse<Plant[], PlantListItemDto[]>(response);
        }

        [HttpDelete("delete/{plantId}")]
        public IActionResult Delete(Guid plantId)
        {
            var response = _plantService.Delete(plantId);
            return ApiResponse<Plant, PlantDto>(response);
        }

        [HttpPost("relate")]
        public IActionResult Relate(Guid plantId, Guid gardenId)
        {            
            var response = _plantService.Relate(plantId, gardenId);
            return ApiResponse(response);
        }
    }
}