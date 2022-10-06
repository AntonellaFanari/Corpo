using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddRoundsColumnSeriesColumnUnitTypeColumnInWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rounds",
                table: "WodGroupMember",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Series",
                table: "WodGroupMember",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitType",
                table: "WodGroupMember",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rounds",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "Series",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "UnitType",
                table: "WodGroupMember");
        }
    }
}
