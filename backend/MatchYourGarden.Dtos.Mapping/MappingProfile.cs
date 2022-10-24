using AutoMapper;
using MatchYourGarden.DataModel;

namespace MatchYourGarden.Dtos.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Plant, PlantDto>();
            CreateMap<Plant, PlantListItemDto>();
            CreateMap<Garden, GardenDto>();
            CreateMap<Garden, GardenListItemDto>();
        }
    }
}
