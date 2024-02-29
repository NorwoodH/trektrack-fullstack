

using Microsoft.AspNetCore.Mvc;
using trektrack_fullstack.Models;
using trektrack_fullstack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace trektrack_fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        // GET: api/<TripController>
        private readonly ITripRepository _tripRepository;
        public TripController(ITripRepository tripRepository)
        {
            _tripRepository = tripRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tripRepository.GetAll());
        }

        // GET api/<TripController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var trip = _tripRepository.GetById(id);
            if (trip == null)
            {
                return NotFound();
            }
            return Ok(trip);
        }

        // TRIP api/<TripController>
        [HttpPost]
        public IActionResult Trip(Trip trip)
        {
            trip.CreateDateTime = DateTime.Now;
            _tripRepository.Add(trip);
            return CreatedAtAction("Get", new { id = trip.Id }, trip);

        }

        // PUT api/<TripController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TripController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}