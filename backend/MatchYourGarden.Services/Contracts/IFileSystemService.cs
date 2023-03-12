using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos;
using Microsoft.AspNetCore.Http;

namespace MatchYourGarden.Services.Contracts
{
    public interface IFileSystemService
    {
        ServiceResponse<ImageDto> Upload(string relativePath, string fileName, IFormFile image);
        ServiceResponse Delete(string filePath);
    }
}