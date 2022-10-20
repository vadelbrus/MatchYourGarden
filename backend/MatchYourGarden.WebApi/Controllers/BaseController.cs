using AutoMapper;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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

        protected IActionResult ApiResponse(ServiceResponse serviceResponse)
        {
            if (serviceResponse.StatusCode == 200)
            {
                return Ok();
            }

            return Error(serviceResponse.StatusCode, serviceResponse.ErrorMessage);
        }

        protected IActionResult ApiResponse<TModel, TDto>(ServiceResponse<TModel> serviceResponse)
        {
            if (serviceResponse.StatusCode == 200)
            {
                var dto = _mapper.Map<TModel, TDto>(serviceResponse.Data);
                return RequestResult(serviceResponse, new Response<TDto>(dto));
            }

            return Error(serviceResponse.StatusCode, serviceResponse.ErrorMessage);
        }

        protected IActionResult ApiPaginatedResultResponse<TModel, TDto>(ServiceResponse<TModel> serviceResponse, int page, int count, int totalCount)
        {
            if (serviceResponse.StatusCode == 200)
            {
                var dto = _mapper.Map<TModel, TDto>(serviceResponse.Data);
                return RequestResult(serviceResponse, new PaginatedResponse<TDto>(dto, page, count, totalCount));
            }

            return Error(serviceResponse.StatusCode, serviceResponse.ErrorMessage);
        }

        private IActionResult RequestResult(IServiceResponse response, IResponse result)
        {
            return Ok(result);
        }

        private IActionResult Error(int statusCode, string error)
        {
            return StatusCode(statusCode, new Response(error));
        }
    }

    public interface IResponse
    {

    }

    public class Response : IResponse
    {
        public Response()
        {
            ServerTimeUtc = DateTime.UtcNow;
            Succeeded = true;
        }

        public Response(bool succeeded) : this()
        {
            Succeeded = succeeded;
        }

        public Response(string errorMessage) : this()
        {
            Message = errorMessage;
            Succeeded = false;
        }

        public Response(ModelStateDictionary modelstate) : this()
        {
            Message = string.Join(", ", GetModelStateError(modelstate));
            Succeeded = string.IsNullOrWhiteSpace(Message);
        }

        public string Message { get; set; }
        public bool Succeeded { get; set; }
        public DateTime ServerTimeUtc { get; set; }


        private protected IEnumerable<string> GetModelStateError(ModelStateDictionary modelstate)
        {
            foreach (var error in modelstate.Values.SelectMany(m => m.Errors))
            {
                if (string.IsNullOrEmpty(error.ErrorMessage))
                    yield return error.Exception.Message;
                else
                    yield return error.ErrorMessage;
            }
        }
    }

    public class Response<T> : Response
    {
        public object Data { get; set; }

        public Response() : base()
        {
        }

        public Response(T data) : base()
        {
            Data = data;
        }

        public Response(T data, string message) : this(data)
        {
            Message = message;
        }

        public Response(IEnumerable<T> data) : base()
        {
            Data = data;
        }

        public Response(IEnumerable<T> data, string message) : this(data)
        {
            Message = message;
        }        
    }

    public class PaginatedResponse<T> : Response<T>
    {
        public int Page { get; set; }
        public int PerPage { get; set; }
        public int TotalCount { get; set; }

        public PaginatedResponse(T data, int page, int perPage, int totalCount) : base(data)
        {
            Page = page;
            PerPage = perPage;
            TotalCount = totalCount;
        }

    }
}