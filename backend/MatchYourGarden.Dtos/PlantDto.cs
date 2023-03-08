namespace MatchYourGarden.Dtos
{
    public class PlantDto : BaseDto
    {
        public string LatinName { get; set; }
        public string? Description { get; set; }
        public string[] Images { get; set; }
        public List<GardenListItemDto>? Gardens { get; set; }
    }
}