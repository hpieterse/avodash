using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace avodash.Models.Enums
{
    public static  class EnumExtension
    {
        public static string GetName(this Enum enumValue)
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .FirstOrDefault()
                            ?.GetCustomAttribute<DisplayAttribute>()
                            ?.Name ?? enumValue.ToString();
        }
    }
}
