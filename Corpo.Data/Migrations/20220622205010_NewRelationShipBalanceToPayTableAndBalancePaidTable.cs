using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class NewRelationShipBalanceToPayTableAndBalancePaidTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "BalancePaidBalanceToPay",
                columns: table => new
                {
                    BalancesPaidsId = table.Column<int>(type: "int", nullable: false),
                    BalancesToPayId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BalancePaidBalanceToPay", x => new { x.BalancesPaidsId, x.BalancesToPayId });
                    table.ForeignKey(
                        name: "FK_BalancePaidBalanceToPay_BalancePaid_BalancesPaidsId",
                        column: x => x.BalancesPaidsId,
                        principalTable: "BalancePaid",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BalancePaidBalanceToPay_BalanceToPay_BalancesToPayId",
                        column: x => x.BalancesToPayId,
                        principalTable: "BalanceToPay",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BalancePaidBalanceToPay_BalancesToPayId",
                table: "BalancePaidBalanceToPay",
                column: "BalancesToPayId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BalancePaidBalanceToPay");

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
    }
}
