namespace MatchYourGarden.DataModel
{
    public class Plant : EntityBase
    {        
        public string LatinName { get; set; }          
        public virtual List<Garden> Gardens { get; set; }

        public Plant()
        {
            LatinName = string.Empty;
            Gardens = new List<Garden>();
        }
    }
}