using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RenameWodTemplateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WodGroup_Wod_WodTemplateId",
                table: "WodGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Wod",
                table: "Wod");

            migrationBuilder.RenameTable(
                name: "Wod",
                newName: "WodTemplate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WodTemplate",
                table: "WodTemplate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WodGroup_WodTemplate_WodTemplateId",
                table: "WodGroup",
                column: "WodTemplateId",
                principalTable: "WodTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WodGroup_WodTemplate_WodTemplateId",
                table: "WodGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WodTemplate",
                table: "WodTemplate");

            migrationBuilder.RenameTable(
                name: "WodTemplate",
                newName: "Wod");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Wod",
                table: "Wod",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WodGroup_Wod_WodTemplateId",
                table: "WodGroup",
                column: "WodTemplateId",
                principalTable: "Wod",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
