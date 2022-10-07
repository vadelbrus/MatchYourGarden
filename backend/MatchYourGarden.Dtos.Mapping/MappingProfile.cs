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
        }
    }
}
