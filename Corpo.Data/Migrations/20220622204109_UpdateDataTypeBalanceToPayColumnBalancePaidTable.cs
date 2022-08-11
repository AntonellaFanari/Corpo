using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdateDataTypeBalanceToPayColumnBalancePaidTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BalanceToPayId",
                table: "BalancePaid");

            migrationBuilder.AddColumn<int>(
                name: "BalancePaidId",
                table: "BalanceToPay",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BalanceToPay_BalancePaidId",
                table: "BalanceToPay",
                column: "BalancePaidId");

            migrationBuilder.AddForeignKey(
                name: "FK_BalanceToPay_BalancePaid_BalancePaidId",
                table: "BalanceToPay",
                column: "BalancePaidId",
                principalTable: "BalancePaid",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BalanceToPay_BalancePaid_BalancePaidId",
                table: "BalanceToPay");

            migrationBuilder.DropIndex(
                name: "IX_BalanceToPay_BalancePaidId",
                table: "BalanceToPay");

            migrationBuilder.DropColumn(
                name: "BalancePaidId",
                table: "BalanceToPay");

            migrationBuilder.AddColumn<int>(
                name: "BalanceToPayId",
                table: "BalancePaid",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
