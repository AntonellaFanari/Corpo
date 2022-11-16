using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipWeeklyWodTemplateTableAndWodTemplateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WeeklyWodTemplate_WodTemplateId",
                table: "WeeklyWodTemplate",
                column: "WodTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeeklyWodTemplate_WodTemplate_WodTemplateId",
                table: "WeeklyWodTemplate",
                column: "WodTemplateId",
                principalTable: "WodTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeeklyWodTemplate_WodTemplate_WodTemplateId",
                table: "WeeklyWodTemplate");

            migrationBuilder.DropIndex(
                name: "IX_WeeklyWodTemplate_WodTemplateId",
                table: "WeeklyWodTemplate");
        }
    }
}
