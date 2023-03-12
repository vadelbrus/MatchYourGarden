using AutoMapper;
using MatchYourGarden.DataModel;
using MatchYourGarden.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatchYourGarden.Dtos.Mapping.MappingActions
{
    internal class PlantImageDtoAction : IMappingAction<PlantImage, ImageDto>
    {
        private readonly IConfiguration _configuration;

        public PlantImageDtoAction(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public void Process(PlantImage source, ImageDto destination, ResolutionContext context)
        {
            var section = _configuration.GetRequiredSection(nameof(FileUploadOptions));
            var baseUrl = section[nameof(FileUploadOptions.BaseUrl)];
            var dirOrContainer = section[nameof(FileUploadOptions.UploadDirectoryOrContainerName)];
            var plantsDir = section[nameof(FileUploadOptions.PlantsDirectory)];

            destination.FileName = $"{baseUrl}/{dirOrContainer}/{plantsDir}/{source.PlantId}/{source.Name}";
        }
    }
}
