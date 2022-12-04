namespace MatchYourGarden.Dtos
{
    public class PlantDto : BaseDto
    {
        public string LatinName { get; set; }
        public List<GardenListItemDto>? Gardens { get; set; }
    }
}