using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddRelationTestExerciseMemberTableAndExerciseFmsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TestExerciseMember_ExerciseFmsId",
                table: "TestExerciseMember",
                column: "ExerciseFmsId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestExerciseMember_ExerciseFMS_ExerciseFmsId",
                table: "TestExerciseMember",
                column: "ExerciseFmsId",
                principalTable: "ExerciseFMS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExerciseMember_ExerciseFMS_ExerciseFmsId",
                table: "TestExerciseMember");

            migrationBuilder.DropIndex(
                name: "IX_TestExerciseMember_ExerciseFmsId",
                table: "TestExerciseMember");
        }
    }
}
