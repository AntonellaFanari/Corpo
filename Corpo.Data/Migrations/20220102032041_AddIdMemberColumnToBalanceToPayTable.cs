using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddIdMemberColumnToBalanceToPayTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MemberId",
                table: "BalanceToPay",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BalanceToPay_MemberId",
                table: "BalanceToPay",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_BalanceToPay_Member_MemberId",
                table: "BalanceToPay",
                column: "MemberId",
                principalTable: "Member",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BalanceToPay_Member_MemberId",
                table: "BalanceToPay");

            migrationBuilder.DropIndex(
                name: "IX_BalanceToPay_MemberId",
                table: "BalanceToPay");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "BalanceToPay");
        }
    }
}
