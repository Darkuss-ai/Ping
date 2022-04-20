using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<DataContext>(opt =>
{
opt.UseMySql("Server=80.87.198.2;Database=ping;User=moss;Password=YQnAXTRg", ServerVersion.AutoDetect("Server=80.87.198.2;Database=ping;User=moss;Password=YQnAXTRg"));
    //opt.UseSqlite("Data source=App.db");
});

var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
var options = optionsBuilder.UseMySql("Server=80.87.198.2;Database=ping;User=moss;Password=YQnAXTRg", ServerVersion.AutoDetect("Server=80.87.198.2;Database=ping;User=moss;Password=YQnAXTRg")).Options;


var app = builder.Build();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);

} catch(Exception ex){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

// using(DataContext db = new DataContext(options)){
//     var ids = db.Server.ToList();
//     foreach(Activity u in ids){
//         Console.WriteLine($"{u.Id}" + " " + $"{u.Title}" + " " + $"{u.Date}" + " " + $"{u.Description}"
//          + " " + $"{u.Category}" + " " + $"{u.City}" + " " + $"{u.Venue}");
//     }

// }



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
