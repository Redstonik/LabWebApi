using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace LabWebAPI.Contracts.Data
{
    public interface IRepository<TEntity> where TEntity : class, IBaseEntity
    {
        Task<TEntity> AddAsync(TEntity entity);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByKeyAsync<TKey>(TKey key);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
        Task<int> SaveChangesAsync();

        IQueryable<TEntity> Query(params Expression<Func<TEntity, object>>[] includes);

        Task<TEntity> GetByIdAsync(int id);

        void DeleteWhere(Expression<Func<TEntity, bool>> condition);
    }

}
