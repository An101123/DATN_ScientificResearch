using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace ScientificResearch.Core.Common.Utilities
{
    public static class EnumUtilities
    {
        public static string GetEnumName<T>(this T value)
        {
            try
            {
                var fi = value.GetType().GetField(value.ToString());

                var attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

                return attributes.Length > 0 ? attributes[0].Description : value.ToString();
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
