using System;

namespace OcticonApi.Core.Utils
{
    public static class Constants
    {
        public static DateTime TwoHEarlier = DateTime.Now.AddHours(-2);
        public static DateTime OneHEarlier = DateTime.Now.AddHours(-1);
    }
}
