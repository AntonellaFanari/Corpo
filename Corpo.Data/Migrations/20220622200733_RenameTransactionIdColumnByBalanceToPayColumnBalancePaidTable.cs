using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RenameTransactionIdColumnByBalanceToPayColumnBalancePaidTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "BalancePaid",
                newName: "BalanceToPayId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BalanceToPayId",
                table: "BalancePaid",
                newName: "TransactionId");
        }
    }
}
