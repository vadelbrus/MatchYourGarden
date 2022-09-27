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
}
