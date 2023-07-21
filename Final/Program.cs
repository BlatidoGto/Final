using Final.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<FinalContext>();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

app.Run();
