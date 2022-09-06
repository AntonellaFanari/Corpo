using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipBalancePaidTableAndMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BalancePaid_Member_MemberId",
                table: "BalancePaid");

            migrationBuilder.DropIndex(
                name: "IX_BalancePaid_MemberId",
                table: "BalancePaid");
        }
    }
}
