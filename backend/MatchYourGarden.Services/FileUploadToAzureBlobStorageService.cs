using MatchYourGarden.Dtos;
using MatchYourGarden.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Azure.Storage.Blobs;
using MatchYourGarden.Services.Contracts;

namespace MatchYourGarden.Services
{
    public class FileUploadToAzureBlobStorageService : IFileUploadService
    {
        private readonly IOptions<AzureBlobStorageOptions> _options;
        //private readonly IOptions<FileUploadOptions> _options;

        public FileUploadToAzureBlobStorageService(IOptions<AzureBlobStorageOptions> options)
        {
            _options = options;
        }

        public ServiceResponse<ImageDto> Upload(string relativePath, string fileName, IFormFile image)
        {
            if (image.Length > _options.Value.MaxSize)
            {
                return new ServiceResponse<ImageDto>("File too large.", 413);
            }

            if (!_options.Value.AllowedMimeTypes.Contains(image.ContentType))
            {
                return new ServiceResponse<ImageDto>("Unsupported file format.", 415);
            }

            var container = new BlobContainerClient(_options.Value.ConnectionString, _options.Value.ContainerName);            
            var blobName = $"{relativePath}/{fileName}";
            var blobClient = container.GetBlobClient(blobName);

            using (var s = image.OpenReadStream())
            {
                try
                {
                    var response = blobClient.Upload(s);
                }
                catch (Exception e)
                {
                    return new ServiceResponse<ImageDto>($"Could not upload to Azure storage. {e.Message}", 409);
                }                
            }

            return new ServiceResponse<ImageDto>(new ImageDto(Guid.Empty, $"{_options.Value.BasePath}/{_options.Value.ContainerName}/{relativePath}/{fileName}"));
        }

        public ServiceResponse Delete(string filePath)
        {
            try
            {
                var container = new BlobContainerClient(_options.Value.ConnectionString, _options.Value.ContainerName);
                var blobClient = container.GetBlobClient(filePath);
                blobClient.DeleteIfExists();
                return new ServiceResponse();
            }
            catch (Exception e)
            {
                return new ServiceResponse(e.Message, 500);
            }
        }
    }

    public class AzureBlobStorageOptions : IBasePath
    {
        public int MaxSize { get; set; }
        public string ConnectionString { get; set; }
        public string ContainerName { get; set; }
        public string ImagesDirectory { get; set; }
        public string[] AllowedMimeTypes { get; set; }
        public string BasePath { get; set; }
    }
}
