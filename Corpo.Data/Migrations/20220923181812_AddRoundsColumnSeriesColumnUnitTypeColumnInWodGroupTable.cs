using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddRoundsColumnSeriesColumnUnitTypeColumnInWodGroupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rounds",
                table: "WodGroup",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Series",
                table: "WodGroup",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitType",
                table: "WodGroup",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rounds",
                table: "WodGroup");

            migrationBuilder.DropColumn(
                name: "Series",
                table: "WodGroup");

            migrationBuilder.DropColumn(
                name: "UnitType",
                table: "WodGroup");
        }
    }
}
