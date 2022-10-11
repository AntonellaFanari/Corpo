using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipResultsWodGroupMemberTableAndResultsWodGroupMemberExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResultsWodGroupMemberId",
                table: "ResultsWodGroupMemberExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ResultsWodGroupMemberExercise_ResultsWodGroupMemberId",
                table: "ResultsWodGroupMemberExercise",
                column: "ResultsWodGroupMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_ResultsWodGroupMemberExercise_ResultsWodGroupMember_ResultsWodGroupMemberId",
                table: "ResultsWodGroupMemberExercise",
                column: "ResultsWodGroupMemberId",
                principalTable: "ResultsWodGroupMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResultsWodGroupMemberExercise_ResultsWodGroupMember_ResultsWodGroupMemberId",
                table: "ResultsWodGroupMemberExercise");

            migrationBuilder.DropIndex(
                name: "IX_ResultsWodGroupMemberExercise_ResultsWodGroupMemberId",
                table: "ResultsWodGroupMemberExercise");

            migrationBuilder.DropColumn(
                name: "ResultsWodGroupMemberId",
                table: "ResultsWodGroupMemberExercise");
        }
    }
}
