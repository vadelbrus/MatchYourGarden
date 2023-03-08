using System.Text;

namespace MatchYourGarden.Common
{
    public static class ByteArrayExtensions
    {
        public static string MD5(this byte[] array)
        {
            var hash = System.Security.Cryptography.MD5.Create().ComputeHash(array);
            
            StringBuilder sb = new StringBuilder();
            foreach (byte b in hash)
            {
                sb.Append(b.ToString("x2").ToLower());
            }

            return sb.ToString();
        }
    }
}