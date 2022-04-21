using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RenameTimeColumnToMinutesAndAddSecondsColumnTestExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Time",
                table: "TestExercise",
                newName: "Seconds");

            migrationBuilder.AddColumn<int>(
                name: "Minutes",
                table: "TestExercise",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Minutes",
                table: "TestExercise");

            migrationBuilder.RenameColumn(
                name: "Seconds",
                table: "TestExercise",
                newName: "Time");
        }
    }
}
