using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatchYourGarden.Services
{
    public class ServiceBase<TModel> : IServiceBase<TModel>
        where TModel : EntityBase
    {
        protected IDataContext _dataContext;

        public ServiceBase(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public ServiceResponse<TModel> GetEntity(Guid id)
        {
            var entity = _dataContext.Entities<TModel>().Find(id);

            if (entity != null)
            {
                return new ServiceResponse<TModel>(entity);
            }

            return new ServiceResponse<TModel>($"Entity {typeof(TModel)} with id {id} not found.", 404);
        }

        public ServiceResponse<TModel[]> GetAll(int page, int count)
        {
            var entities = _dataContext.Entities<TModel>().OrderBy(x => x.Name).Skip(page * count).Take(count).ToArray();
            return new ServiceResponse<TModel[]>(entities);
        }

        public ServiceResponse<TModel> Create(TModel obj)
        {
            try
            {
                _dataContext.Entities<TModel>().Add(obj);
                _dataContext.SaveChanges();
                return new ServiceResponse<TModel>(obj);
            }
            catch (Exception e)
            {
                return new ServiceResponse<TModel>(e.Message, 500);
            }            
        }

        public int GetCount()
        {
            return _dataContext.Entities<TModel>().Count();
        }
    }
}
