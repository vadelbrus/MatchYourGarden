using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using Microsoft.AspNetCore.Http;

namespace MatchYourGarden.Services
{
    public interface IBasePath
    {
        string BasePath { get; }
    }
}