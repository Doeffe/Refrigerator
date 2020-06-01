using RefrigeratorAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RefrigeratorAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("name=RefrigeratorDb")
        {

        }

        public DbSet<Entry> Entries { get; set;}
        public DbSet<User> Users { get; set; }

    }
}