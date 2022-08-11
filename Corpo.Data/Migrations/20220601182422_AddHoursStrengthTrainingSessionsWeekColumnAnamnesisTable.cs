using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddHoursStrengthTrainingSessionsWeekColumnAnamnesisTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HoursStrengthTrainingSessionsWeek",
                table: "Anamnesis",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursStrengthTrainingSessionsWeek",
                table: "Anamnesis");
        }
    }
}
