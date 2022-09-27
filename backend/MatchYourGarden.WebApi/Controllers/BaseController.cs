using MatchYourGarden.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace MatchYourGarden.WebApi.Controllers
{
    //[ApiController]
    //[Route("[controller]")]
    public class BaseController : ControllerBase
    {
        protected readonly ILogger<PlantController> _logger;
        protected readonly IDataContext _dataContext;

        public BaseController(ILogger<PlantController> logger, IDataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }
    }
}