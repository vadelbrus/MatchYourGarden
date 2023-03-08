using MatchYourGarden.DataModel;
using Microsoft.AspNetCore.Http;

namespace MatchYourGarden.Services.Contracts
{
    public interface IFileUploadService
    {
        ServiceResponse<string> Upload(string relativePath, string fileName, IFormFile image);
    }
}