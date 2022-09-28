using AutoMapper;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services;
using Microsoft.AspNetCore.Mvc;

namespace MatchYourGarden.WebApi.Controllers
{
    //[ApiController]
    //[Route("[controller]")]
    public class BaseController : ControllerBase
    {
        protected readonly ILogger<PlantController> _logger;
        protected readonly IDataContext _dataContext;
        protected readonly IMapper _mapper;

        public BaseController(ILogger<PlantController> logger, IDataContext dataContext, IMapper mapper)
        {
            _logger = logger;
            _dataContext = dataContext;
            _mapper = mapper;
        }
    }
}