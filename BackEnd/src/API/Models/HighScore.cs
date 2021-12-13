using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class HighScore
    {
        public string Name { get; set; } //Player name
        public float Time { get; set; } //Player time (seconds) to compleate level
    }
}
