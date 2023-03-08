namespace MatchYourGarden.DataModel
{
    public class PlantImage : EntityBase
    {
        public Guid PlantId { get; set; }
        public virtual Plant Plant { get; set; }

        public PlantImage(string fileName) : this()
        {
            Name = fileName;
        }

        public PlantImage()
        {

        }
    }
}