namespace MatchYourGarden.Services.Contracts
{
    public interface IServiceBase<T>
    {
        public ServiceResponse<T>? GetEntity(Guid id);
        public ServiceResponse<T[]> GetAll(int page, int count);
        public int GetCount();
        public ServiceResponse<T> Create(T obj);
        public ServiceResponse<T> Delete(Guid id);
    }
}