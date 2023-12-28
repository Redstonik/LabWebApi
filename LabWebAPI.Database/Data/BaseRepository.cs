using LabWebAPI.Contracts.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LabWebAPI.Database.Data
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity :
   class, IBaseEntity
    {
        protected readonly LabWebApiDbContext _dbContext;
        protected readonly DbSet<TEntity> _dbSet;
        public BaseRepository(LabWebApiDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
        }
        public void DeleteWhere(Expression<Func<TEntity, bool>> condition)
        {
            var entitiesToDelete = _dbSet.Where(condition);
            _dbSet.RemoveRange(entitiesToDelete);
        }
        public async Task<TEntity> AddAsync(TEntity entity)
        {
            return (await _dbSet.AddAsync(entity)).Entity;
        }
        public async Task DeleteAsync(TEntity entity)
        {
            _dbSet.Remove(entity);
            await Task.CompletedTask;
        }
        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<TEntity> GetByKeyAsync<TKey>(TKey key)
        {
            return await _dbSet.FindAsync(key);
        }
        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(TEntity entity)
        {
            await Task.Run(() => _dbContext.Entry(entity).State =
           EntityState.Modified);
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public IQueryable<TEntity> Query(params Expression<Func<TEntity, object>>[] includes)
        {
            var query = includes
                .Aggregate<Expression<Func<TEntity, object>>,
                IQueryable<TEntity>>(_dbSet, (current, include) => current.Include(include));

            return query;
        }

    }
}
