using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddRestColumnAndIntensityColumnWodMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Intensity",
                table: "WodMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rest",
                table: "WodMember",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Intensity",
                table: "WodMember");

            migrationBuilder.DropColumn(
                name: "Rest",
                table: "WodMember");
        }
    }
}
