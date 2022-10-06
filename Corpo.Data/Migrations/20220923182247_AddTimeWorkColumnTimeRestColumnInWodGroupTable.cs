using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddTimeWorkColumnTimeRestColumnInWodGroupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeRest",
                table: "WodGroup",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimeWork",
                table: "WodGroup",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeRest",
                table: "WodGroup");

            migrationBuilder.DropColumn(
                name: "TimeWork",
                table: "WodGroup");
        }
    }
}
