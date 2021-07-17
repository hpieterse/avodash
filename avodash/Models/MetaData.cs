﻿using System;
using System.Collections.Generic;
using avodash.Models.Enums;

namespace avodash.Models
{
    public class MetaData
    {
        public DateTime MinDate { get; set; }

        public DateTime MaxDate { get; set; }

        public IEnumerable<KeyValuePair<int, string>> ProductionTypes { get; set; }

        public IEnumerable<KeyValuePair<string, string>> Regions { get; set; }

        public IEnumerable<KeyValuePair<int, string>> PackageTypes {get;set;}
    }
}
