using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RenameIncomeTypeColumnBalancePaidTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "incomeType",
                table: "BalancePaid",
                newName: "IncomeType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IncomeType",
                table: "BalancePaid",
                newName: "incomeType");
        }
    }
}
