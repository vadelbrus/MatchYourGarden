namespace MatchYourGarden.Dtos
{
    public class PlantDto : BaseDto
    {
        public string LatinName { get; set; }
        public string? Description { get; set; }
        public ImageDto[] Images { get; set; }
        public List<GardenListItemDto>? Gardens { get; set; }
    }
}