namespace MatchYourGarden.DataModel
{
    public class Garden : EntityBase
    {
        public string Name { get; set; }
        public virtual List<Plant> Plants { get; set; }

        public Garden()
        {
            Name = string.Empty;
            Plants = new List<Plant>();
        }
    }
}