namespace RefrigeratorAPI.Migrations
{
    using RefrigeratorAPI.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;


    internal sealed class Configuration : DbMigrationsConfiguration<RefrigeratorAPI.Data.AppDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RefrigeratorAPI.Data.AppDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            context.Entries.Add(new Entry
            {
                Category = EntityUtilities.EntityCategory.OtherFoods,
                Description = "Rullepølse",
                IsExpense = false,
                Value = 20,
                Price = 10,
                Unit = EntityUtilities.UnitType.pk
            });

            context.Entries.Add(new Entry
            {
                Category = EntityUtilities.EntityCategory.Dairy,
                Description = "Mælk",
                IsExpense = true,
                Value = 1,
                Price = 10,
                Unit = EntityUtilities.UnitType.l
            });

            context.Users.Add(new User
            {
                UserName = "Nicolai",
                Password = "n"
            });
        }
    }
}
