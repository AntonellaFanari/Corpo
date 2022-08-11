using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteTimeColumnAddMinutesColumnAndSecondsColumnTestHeartRateExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "TestHeartRateExercise");

            migrationBuilder.AddColumn<int>(
                name: "Seconds",
                table: "TestHeartRateExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "minutes",
                table: "TestHeartRateExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Seconds",
                table: "TestHeartRateExercise");

            migrationBuilder.DropColumn(
                name: "minutes",
                table: "TestHeartRateExercise");

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "TestHeartRateExercise",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
