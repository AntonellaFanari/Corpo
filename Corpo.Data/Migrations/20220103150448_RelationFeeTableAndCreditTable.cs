using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationFeeTableAndCreditTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Credit_Fee_FeeId",
                table: "Credit");

            migrationBuilder.DropIndex(
                name: "IX_Credit_FeeId",
                table: "Credit");

            migrationBuilder.DropColumn(
                name: "FeeId",
                table: "Credit");

            migrationBuilder.AddColumn<int>(
                name: "CreditId",
                table: "Fee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Fee_CreditId",
                table: "Fee",
                column: "CreditId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fee_Credit_CreditId",
                table: "Fee",
                column: "CreditId",
                principalTable: "Credit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fee_Credit_CreditId",
                table: "Fee");

            migrationBuilder.DropIndex(
                name: "IX_Fee_CreditId",
                table: "Fee");

            migrationBuilder.DropColumn(
                name: "CreditId",
                table: "Fee");

            migrationBuilder.AddColumn<int>(
                name: "FeeId",
                table: "Credit",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Credit_FeeId",
                table: "Credit",
                column: "FeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Credit_Fee_FeeId",
                table: "Credit",
                column: "FeeId",
                principalTable: "Fee",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
