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

            CreateMap<Garden, GardenDto>();
            CreateMap<GardenDto, Garden>();
            CreateMap<Garden, GardenListItemDto>();
            CreateMap<GardenListItemDto, Garden>();
        }
    }
}
