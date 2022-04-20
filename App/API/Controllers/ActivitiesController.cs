using Persistence;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context){
           _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            Console.WriteLine(_context.Activities.ToListAsync().Result[0].Id);
            return await _context.Activities.ToListAsync();

        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            Console.WriteLine(_context.Activities.FindAsync(id).Result.Id);
            return await _context.Activities.FindAsync(id);
        }
        
    }
}