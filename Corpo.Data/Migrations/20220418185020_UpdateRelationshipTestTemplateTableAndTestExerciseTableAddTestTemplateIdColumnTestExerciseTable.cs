using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdateRelationshipTestTemplateTableAndTestExerciseTableAddTestTemplateIdColumnTestExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.AlterColumn<int>(
                name: "TestTemplateId",
                table: "TestExercise",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.AlterColumn<int>(
                name: "TestTemplateId",
                table: "TestExercise",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
