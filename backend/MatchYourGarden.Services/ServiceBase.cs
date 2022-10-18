using MatchYourGarden.DataModel;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatchYourGarden.Services
{
    public class ServiceBase<T> where T : EntityBase
    {
        protected IDataContext _dataContext;

        public ServiceBase(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public ServiceResponse<T> GetEntity(Guid id)
        {
            var entity = _dataContext.Entities<T>().Find(id);

            if (entity != null)
            {
                return new ServiceResponse<T>(entity);
            }

            return new ServiceResponse<T>($"Entity {typeof(T)} with id {id} not found.", 404);
        }

        public ServiceResponse<T[]> GetAll(int page, int count)
        {
            var entities = _dataContext.Entities<T>().OrderBy(x => x.Name).Skip(page * count).Take(count).ToArray();
            return new ServiceResponse<T[]>(entities);
        }

        public int GetCount()
        {
            return _dataContext.Entities<T>().Count();
        }
    }
}
