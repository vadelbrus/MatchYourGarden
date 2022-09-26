namespace MatchYourGarden.DataModel
{
    public class Plant : EntityBase
    {        
        public string Name { get; set; }
        public string LatinName { get; set; }          
        public virtual List<Garden> Gardens { get; set; }

        public Plant()
        {
            Name = string.Empty;
            LatinName = string.Empty;
            Gardens = new List<Garden>();
        }
    }
}