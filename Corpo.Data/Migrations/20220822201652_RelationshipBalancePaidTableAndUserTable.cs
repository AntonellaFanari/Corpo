using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationshipBalancePaidTableAndUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BalancePaid_UserId",
                table: "BalancePaid",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BalancePaid_User_UserId",
                table: "BalancePaid",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BalancePaid_User_UserId",
                table: "BalancePaid");

            migrationBuilder.DropIndex(
                name: "IX_BalancePaid_UserId",
                table: "BalancePaid");
        }
    }
}
