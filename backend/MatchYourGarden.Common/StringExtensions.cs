using System.Text;

namespace MatchYourGarden.Common
{
    public static class StringExtensions
    {
        public static string ContentTypeToFileExtension(this string contentType)
        {
            return contentType.Split('/')[1];
        }
    }
}