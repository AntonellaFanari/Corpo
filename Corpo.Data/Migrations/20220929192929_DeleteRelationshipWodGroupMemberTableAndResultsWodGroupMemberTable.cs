using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteRelationshipWodGroupMemberTableAndResultsWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WodGroupMember_ResultsWodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember");

            migrationBuilder.DropIndex(
                name: "IX_WodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "ResultsWodGroupMemberId",
                table: "WodGroupMember");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResultsWodGroupMemberId",
                table: "WodGroupMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember",
                column: "ResultsWodGroupMemberId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WodGroupMember_ResultsWodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember",
                column: "ResultsWodGroupMemberId",
                principalTable: "ResultsWodGroupMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
