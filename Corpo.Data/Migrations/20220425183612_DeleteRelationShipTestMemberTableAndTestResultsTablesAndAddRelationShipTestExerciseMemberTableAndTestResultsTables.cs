using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteRelationShipTestMemberTableAndTestResultsTablesAndAddRelationShipTestExerciseMemberTableAndTestResultsTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestHeartRateExercise_TestExercise_TestExerciseId",
                table: "TestHeartRateExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestHeartRateExercise_TestMember_TestMemberId",
                table: "TestHeartRateExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestRepetitionExercise_TestExercise_TestExerciseId",
                table: "TestRepetitionExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestRepetitionExercise_TestMember_TestMemberId",
                table: "TestRepetitionExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestVideoExercise_TestExercise_TestExerciseId",
                table: "TestVideoExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestVideoExercise_TestMember_TestMemberId",
                table: "TestVideoExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestVideoExercise_TestMemberId",
                table: "TestVideoExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestRepetitionExercise_TestMemberId",
                table: "TestRepetitionExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestHeartRateExercise_TestMemberId",
                table: "TestHeartRateExercise");

            migrationBuilder.RenameColumn(
                name: "TestExerciseId",
                table: "TestVideoExercise",
                newName: "TestExerciseMemberId");

            migrationBuilder.RenameIndex(
                name: "IX_TestVideoExercise_TestExerciseId",
                table: "TestVideoExercise",
                newName: "IX_TestVideoExercise_TestExerciseMemberId");

            migrationBuilder.RenameColumn(
                name: "TestExerciseId",
                table: "TestRepetitionExercise",
                newName: "TestExerciseMemberId");

            migrationBuilder.RenameIndex(
                name: "IX_TestRepetitionExercise_TestExerciseId",
                table: "TestRepetitionExercise",
                newName: "IX_TestRepetitionExercise_TestExerciseMemberId");

            migrationBuilder.RenameColumn(
                name: "TestExerciseId",
                table: "TestHeartRateExercise",
                newName: "TestExerciseMemberId");

            migrationBuilder.RenameIndex(
                name: "IX_TestHeartRateExercise_TestExerciseId",
                table: "TestHeartRateExercise",
                newName: "IX_TestHeartRateExercise_TestExerciseMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestHeartRateExercise_TestExerciseMember_TestExerciseMemberId",
                table: "TestHeartRateExercise",
                column: "TestExerciseMemberId",
                principalTable: "TestExerciseMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestRepetitionExercise_TestExerciseMember_TestExerciseMemberId",
                table: "TestRepetitionExercise",
                column: "TestExerciseMemberId",
                principalTable: "TestExerciseMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestVideoExercise_TestExerciseMember_TestExerciseMemberId",
                table: "TestVideoExercise",
                column: "TestExerciseMemberId",
                principalTable: "TestExerciseMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestHeartRateExercise_TestExerciseMember_TestExerciseMemberId",
                table: "TestHeartRateExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestRepetitionExercise_TestExerciseMember_TestExerciseMemberId",
                table: "TestRepetitionExercise");

            migrationBuilder.DropForeignKey(
                name: "FK_TestVideoExercise_TestExerciseMember_TestExerciseMemberId",
                table: "TestVideoExercise");

            migrationBuilder.RenameColumn(
                name: "TestExerciseMemberId",
                table: "TestVideoExercise",
                newName: "TestExerciseId");

            migrationBuilder.RenameIndex(
                name: "IX_TestVideoExercise_TestExerciseMemberId",
                table: "TestVideoExercise",
                newName: "IX_TestVideoExercise_TestExerciseId");

            migrationBuilder.RenameColumn(
                name: "TestExerciseMemberId",
                table: "TestRepetitionExercise",
                newName: "TestExerciseId");

            migrationBuilder.RenameIndex(
                name: "IX_TestRepetitionExercise_TestExerciseMemberId",
                table: "TestRepetitionExercise",
                newName: "IX_TestRepetitionExercise_TestExerciseId");

            migrationBuilder.RenameColumn(
                name: "TestExerciseMemberId",
                table: "TestHeartRateExercise",
                newName: "TestExerciseId");

            migrationBuilder.RenameIndex(
                name: "IX_TestHeartRateExercise_TestExerciseMemberId",
                table: "TestHeartRateExercise",
                newName: "IX_TestHeartRateExercise_TestExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TestVideoExercise_TestMemberId",
                table: "TestVideoExercise",
                column: "TestMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestRepetitionExercise_TestMemberId",
                table: "TestRepetitionExercise",
                column: "TestMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestHeartRateExercise_TestMemberId",
                table: "TestHeartRateExercise",
                column: "TestMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestHeartRateExercise_TestExercise_TestExerciseId",
                table: "TestHeartRateExercise",
                column: "TestExerciseId",
                principalTable: "TestExercise",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestHeartRateExercise_TestMember_TestMemberId",
                table: "TestHeartRateExercise",
                column: "TestMemberId",
                principalTable: "TestMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestRepetitionExercise_TestExercise_TestExerciseId",
                table: "TestRepetitionExercise",
                column: "TestExerciseId",
                principalTable: "TestExercise",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestRepetitionExercise_TestMember_TestMemberId",
                table: "TestRepetitionExercise",
                column: "TestMemberId",
                principalTable: "TestMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestVideoExercise_TestExercise_TestExerciseId",
                table: "TestVideoExercise",
                column: "TestExerciseId",
                principalTable: "TestExercise",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestVideoExercise_TestMember_TestMemberId",
                table: "TestVideoExercise",
                column: "TestMemberId",
                principalTable: "TestMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
