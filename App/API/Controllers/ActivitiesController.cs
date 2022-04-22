using Persistence;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using MySqlConnector;
using Newtonsoft.Json;

namespace API.Controllers
{
    
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;

        static Test_table JsonParse(string path, out string str){
            str = "";
            StreamReader streamReader = new StreamReader(path); // Читаем Json файл
 
            while (!streamReader.EndOfStream) { // До конца файла
                str += streamReader.ReadLine(); // Вписываем в строку весь файл 
            }
            Test_table des = JsonConvert.DeserializeObject<Test_table>(str); // Разбор Json файла
            return des; // Возвращаем
        }


        static string ParseToJson(int id, string name){
            Test_table ToJson = new Test_table();
            ToJson.id = id;
            ToJson.name = name;
            string str = JsonConvert.SerializeObject(ToJson);  
            return str;
        }

        public ActivitiesController(DataContext context){
           _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            var options = optionsBuilder.UseMySql("Server=80.87.198.2;Database=ping;User=moss;Password=YQnAXTRg", 
            ServerVersion.AutoDetect("Server=80.87.198.2;Database=ping;User=moss;Password=YQnAXTRg")).Options;
            string test = ParseToJson(100, "Armen");
            string str;
            Test_table Json = JsonParse("../test.txt", out str);
            var connection = new MySqlConnection("Server=80.87.198.2;Port=3306;Database=ping; Uid=moss; Pwd=YQnAXTRg;");
            connection.Open();
            var command = new MySqlCommand($"INSERT INTO Test_table (id, name) VALUES ('{Json.id}' ,'{Json.name}')", connection);
            command.ExecuteScalar();
            Console.WriteLine(test);
            connection.Close();
            
            
            
            //Console.WriteLine(_context.Activities.ToListAsync().Result[0].Id);
            return await _context.Activities.ToListAsync();

        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            Console.WriteLine(_context.Activities.FindAsync(id).Result.Id);
            return await _context.Activities.FindAsync(id);
        }
        
    }
}