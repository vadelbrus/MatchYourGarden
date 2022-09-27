namespace MatchYourGarden.Services.Contracts
{
    public interface IServiceBase<T>
    {
        public ServiceResponse<T>? GetEntity(Guid id);
    }
}