using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipWodMemberTableAndWeeklyTemplateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WeeklyTemplateId",
                table: "WodMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WodMember_WeeklyTemplateId",
                table: "WodMember",
                column: "WeeklyTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_WodMember_WeeklyTemplate_WeeklyTemplateId",
                table: "WodMember",
                column: "WeeklyTemplateId",
                principalTable: "WeeklyTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WodMember_WeeklyTemplate_WeeklyTemplateId",
                table: "WodMember");

            migrationBuilder.DropIndex(
                name: "IX_WodMember_WeeklyTemplateId",
                table: "WodMember");

            migrationBuilder.DropColumn(
                name: "WeeklyTemplateId",
                table: "WodMember");
        }
    }
}
