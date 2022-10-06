using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipResultsWodGroupMemberTableAndWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WodGroupMemberId",
                table: "ResultsWodGroupMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ResultsWodGroupMember_WodGroupMemberId",
                table: "ResultsWodGroupMember",
                column: "WodGroupMemberId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ResultsWodGroupMember_WodGroupMember_WodGroupMemberId",
                table: "ResultsWodGroupMember",
                column: "WodGroupMemberId",
                principalTable: "WodGroupMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResultsWodGroupMember_WodGroupMember_WodGroupMemberId",
                table: "ResultsWodGroupMember");

            migrationBuilder.DropIndex(
                name: "IX_ResultsWodGroupMember_WodGroupMemberId",
                table: "ResultsWodGroupMember");

            migrationBuilder.DropColumn(
                name: "WodGroupMemberId",
                table: "ResultsWodGroupMember");
        }
    }
}
