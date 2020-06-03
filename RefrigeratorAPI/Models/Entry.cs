using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using static RefrigeratorAPI.Models.EntityUtilities;

namespace RefrigeratorAPI.Models
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }
        // foreign key
        public User User { get; set; }   

        public EntityCategory Category { get; set; }
        public string Description { get; set; }
        public bool IsExpense { get; set; }
        public double Value { get; set; }        
        public UnitType Unit { get; set; }
        public double Price { get; set; }

    }   
}