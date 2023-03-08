using AutoMapper;
using MatchYourGarden.DataModel;

namespace MatchYourGarden.Dtos.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Plant, PlantDto>();
            CreateMap<PlantDto, Plant>();
            CreateMap<Plant, PlantListItemDto>();
            CreateMap<PlantListItemDto, Plant>();

            // Ugly. "images" should come from FileUploadOptions.ImagesDirectory config section
            // Leaving for now
            CreateMap<PlantImage, ImageDto>().ConvertUsing(p => new ImageDto(p.Id, $"images/plants/{p.PlantId}/{p.Name}"));

            CreateMap<Garden, GardenDto>();
            CreateMap<GardenDto, Garden>();
            CreateMap<Garden, GardenListItemDto>();
            CreateMap<GardenListItemDto, Garden>();
        }
    }
}
