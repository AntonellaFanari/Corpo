using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddPauseBetweenRoundsColumnPauseBetweenExercisesColumnInWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PauseBetweenExercises",
                table: "WodGroupMember",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PauseBetweenRounds",
                table: "WodGroupMember",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PauseBetweenExercises",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "PauseBetweenRounds",
                table: "WodGroupMember");
        }
    }
}
