namespace RefrigeratorAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class entryModified : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Entries", "Price", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Entries", "Price");
        }
    }
}
