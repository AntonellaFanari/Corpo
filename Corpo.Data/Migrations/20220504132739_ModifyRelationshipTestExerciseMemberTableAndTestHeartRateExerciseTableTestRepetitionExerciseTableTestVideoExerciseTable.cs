using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class ModifyRelationshipTestExerciseMemberTableAndTestHeartRateExerciseTableTestRepetitionExerciseTableTestVideoExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TestVideoExercise_TestExerciseMemberId",
                table: "TestVideoExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestRepetitionExercise_TestExerciseMemberId",
                table: "TestRepetitionExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestHeartRateExercise_TestExerciseMemberId",
                table: "TestHeartRateExercise");

            migrationBuilder.CreateIndex(
                name: "IX_TestVideoExercise_TestExerciseMemberId",
                table: "TestVideoExercise",
                column: "TestExerciseMemberId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestRepetitionExercise_TestExerciseMemberId",
                table: "TestRepetitionExercise",
                column: "TestExerciseMemberId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestHeartRateExercise_TestExerciseMemberId",
                table: "TestHeartRateExercise",
                column: "TestExerciseMemberId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TestVideoExercise_TestExerciseMemberId",
                table: "TestVideoExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestRepetitionExercise_TestExerciseMemberId",
                table: "TestRepetitionExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestHeartRateExercise_TestExerciseMemberId",
                table: "TestHeartRateExercise");

            migrationBuilder.CreateIndex(
                name: "IX_TestVideoExercise_TestExerciseMemberId",
                table: "TestVideoExercise",
                column: "TestExerciseMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestRepetitionExercise_TestExerciseMemberId",
                table: "TestRepetitionExercise",
                column: "TestExerciseMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestHeartRateExercise_TestExerciseMemberId",
                table: "TestHeartRateExercise",
                column: "TestExerciseMemberId");
        }
    }
}
