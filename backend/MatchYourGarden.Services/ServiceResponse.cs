namespace MatchYourGarden.Services
{
    public interface IServiceResponse
    {        
        int StatusCode { get; }
        string? ErrorMessage { get; }
    }

    public class ServiceResponse : IServiceResponse
    {
        public int StatusCode
        {
            get; set;
        }

        public string? ErrorMessage
        {
            get;
            private set;
        }

        public ServiceResponse()
        {
            this.StatusCode = 200;
        }

        public ServiceResponse(string errorMessage, int statusCode)
        {
            this.ErrorMessage = errorMessage;
            this.StatusCode = statusCode;
        }
    }

    public class ServiceResponse<T> : ServiceResponse
    {
        public T? Data { get; set; }

        public ServiceResponse(T data)
        {
            this.StatusCode = 200;
            this.Data = data;
        }

        public ServiceResponse(string errorMessage, int statusCode) : base(errorMessage, statusCode)
        {
        }        
    }

    public class PaginatedResultServiceResponse<T> : ServiceResponse<T>
    {
        public int Page { get; set; }
        public int PerPage { get; set; }
        public int TotalCount { get; set; }

        public PaginatedResultServiceResponse(T data) : base(data)
        {
                        
        }

        public PaginatedResultServiceResponse(string errorMessage, int statusCode) : base(errorMessage, statusCode)
        {
        }
    }
}
