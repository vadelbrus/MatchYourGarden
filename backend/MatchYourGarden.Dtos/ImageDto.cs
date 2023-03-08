using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatchYourGarden.Dtos
{
    public class ImageDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }

        public ImageDto(Guid id, string fileName) : this()
        {
            Id = id;
            FileName = fileName;
        }

        public ImageDto()
        {

        }
    }
}
