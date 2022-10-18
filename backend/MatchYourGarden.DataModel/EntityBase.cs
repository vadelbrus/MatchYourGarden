namespace MatchYourGarden.DataModel
{
    public class EntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public EntityBase()
        {
            Name = string.Empty;
        }
    }
}
