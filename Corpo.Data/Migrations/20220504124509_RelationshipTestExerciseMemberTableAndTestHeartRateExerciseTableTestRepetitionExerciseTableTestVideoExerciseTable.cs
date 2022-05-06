using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipTestExerciseMemberTableAndTestHeartRateExerciseTableTestRepetitionExerciseTableTestVideoExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestResultId",
                table: "TestExerciseMember");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TestResultId",
                table: "TestExerciseMember",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
