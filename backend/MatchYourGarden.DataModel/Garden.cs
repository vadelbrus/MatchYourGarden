﻿namespace MatchYourGarden.DataModel
{
    public class Garden : EntityBase
    {        
        public virtual List<Plant> Plants { get; set; }
        public string? Description { get; set; }

        public Garden()
        {            
            Plants = new List<Plant>();
        }
    }
}