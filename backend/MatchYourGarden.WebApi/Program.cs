using AutoMapper;
using MatchYourGarden.Dtos.Mapping;
using MatchYourGarden.Persistence;
using MatchYourGarden.Services;
using MatchYourGarden.Services.Contracts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddScoped<IDataContext, DataContext>();
builder.Services.AddScoped<IPlantService, PlantService>();
builder.Services.AddScoped<IGardenService, GardenService>();

//var settings = builder.Configuration.GetSection(nameof(FileUploadOptions));
//builder.Services.Configure<FileUploadOptions>(settings);
//builder.Services.AddScoped<IFileUploadService, FileUploadToFileSystemService>();

var settings = builder.Configuration.GetSection(nameof(AzureBlobStorageOptions));
builder.Services.Configure<AzureBlobStorageOptions>(settings);
builder.Services.AddScoped<IFileUploadService, FileUploadToAzureBlobStorageService>();

// Add the AutoMapper to our DI container
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddCors(options => { options.AddPolicy("AllowAll", policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()); });


var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
