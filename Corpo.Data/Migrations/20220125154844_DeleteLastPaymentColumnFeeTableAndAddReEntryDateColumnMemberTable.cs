using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteLastPaymentColumnFeeTableAndAddReEntryDateColumnMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastPayment",
                table: "Fee");

            migrationBuilder.AddColumn<DateTime>(
                name: "ReEntryDate",
                table: "Member",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReEntryDate",
                table: "Member");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastPayment",
                table: "Fee",
                type: "datetime2",
                nullable: true);
        }
    }
}
