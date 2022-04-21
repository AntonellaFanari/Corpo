using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdateRelationshipTestTemplateTableAndTestExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestExerciseTestTemplate");

            migrationBuilder.AddColumn<int>(
                name: "TestTemplateId",
                table: "TestExercise",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestExercise_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropIndex(
                name: "IX_TestExercise_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropColumn(
                name: "TestTemplateId",
                table: "TestExercise");

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
                        name: "FK_TestExerciseTestTemplate_TestTemplate_TestTemplatesId",
                        column: x => x.TestTemplatesId,
                        principalTable: "TestTemplate",
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
