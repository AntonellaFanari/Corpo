using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddPauseBetweenRoundsColumnPauseBetweenExercisesColumnInWodGroupTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PauseBetweenExercises",
                table: "WodGroup",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PauseBetweenRounds",
                table: "WodGroup",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PauseBetweenExercises",
                table: "WodGroup");

            migrationBuilder.DropColumn(
                name: "PauseBetweenRounds",
                table: "WodGroup");
        }
    }
}
