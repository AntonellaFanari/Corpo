using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdateNameTimesColumnResultsWodGroupMemberExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Time",
                table: "ResultsWodGroupMemberExercise",
                newName: "Times");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Times",
                table: "ResultsWodGroupMemberExercise",
                newName: "Time");
        }
    }
}
