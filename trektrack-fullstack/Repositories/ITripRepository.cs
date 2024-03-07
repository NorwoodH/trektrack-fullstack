using Microsoft.Extensions.Hosting;
using trektrack_fullstack.Models;

namespace trektrack_fullstack.Repositories

{
    public interface ITripRepository
    {
        void Add(Trip trip);
        List<Trip> GetAll();
        Trip GetById(int id);
        void Update(Trip trip);
        void Delete(int id);
    }

}

