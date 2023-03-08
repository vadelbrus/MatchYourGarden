using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using Microsoft.AspNetCore.Http;

namespace MatchYourGarden.Services.Contracts
{
    public interface IFileUploadService
    {
        ServiceResponse<ImageDto> Upload(string relativePath, string fileName, IFormFile image);
    }
}