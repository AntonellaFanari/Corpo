using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddStaggeredTypeColumnStaggeredValueColumnInWodGroupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StaggeredType",
                table: "WodGroup",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StaggeredValue",
                table: "WodGroup",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StaggeredType",
                table: "WodGroup");

            migrationBuilder.DropColumn(
                name: "StaggeredValue",
                table: "WodGroup");
        }
    }
}
