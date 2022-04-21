using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdateTestExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestExerciseTestTemplate");

            migrationBuilder.RenameColumn(
                name: "TypeTest",
                table: "TestExercise",
                newName: "Time");

            migrationBuilder.AddColumn<int>(
                name: "TestTemplateId",
                table: "TestExercise",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TestType",
                table: "TestExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Video",
                table: "TestExercise",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestExercise_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestExercise_testTemplate_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId",
                principalTable: "testTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExercise_testTemplate_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestExercise_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropColumn(
                name: "TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropColumn(
                name: "TestType",
                table: "TestExercise");

            migrationBuilder.DropColumn(
                name: "Video",
                table: "TestExercise");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "TestExercise",
                newName: "TypeTest");

            migrationBuilder.CreateTable(
                name: "TestExerciseTestTemplate",
                columns: table => new
                {
                    TestExercisesId = table.Column<int>(type: "int", nullable: false),
                    TestTemplatesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestExerciseTestTemplate", x => new { x.TestExercisesId, x.TestTemplatesId });
                    table.ForeignKey(
                        name: "FK_TestExerciseTestTemplate_TestExercise_TestExercisesId",
                        column: x => x.TestExercisesId,
                        principalTable: "TestExercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestExerciseTestTemplate_testTemplate_TestTemplatesId",
                        column: x => x.TestTemplatesId,
                        principalTable: "testTemplate",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestExerciseTestTemplate_TestTemplatesId",
                table: "TestExerciseTestTemplate",
                column: "TestTemplatesId");
        }
    }
}
