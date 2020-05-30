namespace RefrigeratorAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatedinit : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Entries", "Unit", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Entries", "Unit", c => c.Int(nullable: false));
        }
    }
}
