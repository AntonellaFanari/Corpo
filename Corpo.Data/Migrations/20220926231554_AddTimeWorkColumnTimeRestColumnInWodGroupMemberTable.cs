using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddTimeWorkColumnTimeRestColumnInWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeRest",
                table: "WodGroupMember",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimeWork",
                table: "WodGroupMember",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeRest",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "TimeWork",
                table: "WodGroupMember");
        }
    }
}
