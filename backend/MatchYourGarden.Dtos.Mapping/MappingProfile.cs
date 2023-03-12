using AutoMapper;
using MatchYourGarden.DataModel;
using MatchYourGarden.Dtos.Mapping.MappingActions;
using MatchYourGarden.Services;

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
            CreateMap<PlantImage, ImageDto>().AfterMap<PlantImageDtoAction>();
            CreateMap<Garden, GardenDto>();
            CreateMap<GardenDto, Garden>();
            CreateMap<Garden, GardenListItemDto>();
            CreateMap<GardenListItemDto, Garden>();
        }
    }
}
