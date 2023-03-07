namespace MatchYourGarden.Dtos
{
    public class GardenDto : BaseDto
    {
        public string? Description { get; set; }
        public List<PlantListItemDto>? Plants { get; set; }
    }
}