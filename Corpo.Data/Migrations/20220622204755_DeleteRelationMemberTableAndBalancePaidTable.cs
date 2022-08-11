using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteRelationMemberTableAndBalancePaidTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BalancePaid_Member_MemberId",
                table: "BalancePaid");

            migrationBuilder.DropIndex(
                name: "IX_BalancePaid_MemberId",
                table: "BalancePaid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BalancePaid_MemberId",
                table: "BalancePaid",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_BalancePaid_Member_MemberId",
                table: "BalancePaid",
                column: "MemberId",
                principalTable: "Member",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
