using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteRelationshipCreditTableWithFeeTableAndEstablishRelationshipWithMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fee_Credit_CreditId",
                table: "Fee");

            migrationBuilder.DropIndex(
                name: "IX_Fee_CreditId",
                table: "Fee");

            migrationBuilder.DropColumn(
                name: "Credit",
                table: "Member");

            migrationBuilder.DropColumn(
                name: "Expiration",
                table: "Member");

            migrationBuilder.DropColumn(
                name: "CreditId",
                table: "Fee");

            migrationBuilder.RenameColumn(
                name: "Negative",
                table: "Member",
                newName: "CreditId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Expiration",
                table: "Credit",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Member_CreditId",
                table: "Member",
                column: "CreditId");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_Credit_CreditId",
                table: "Member",
                column: "CreditId",
                principalTable: "Credit",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_Credit_CreditId",
                table: "Member");

            migrationBuilder.DropIndex(
                name: "IX_Member_CreditId",
                table: "Member");

            migrationBuilder.DropColumn(
                name: "Expiration",
                table: "Credit");

            migrationBuilder.RenameColumn(
                name: "CreditId",
                table: "Member",
                newName: "Negative");

            migrationBuilder.AddColumn<int>(
                name: "Credit",
                table: "Member",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Expiration",
                table: "Member",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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
    }
}
