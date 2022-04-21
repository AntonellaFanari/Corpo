using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateTestTemplateTableAndTestExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestExercise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeTest = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestExercise", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "testTemplate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_testTemplate", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestExerciseTestTemplate");

            migrationBuilder.DropTable(
                name: "TestExercise");

            migrationBuilder.DropTable(
                name: "testTemplate");
        }
    }
}
