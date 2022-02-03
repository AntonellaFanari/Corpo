using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteMonthColumnAndCreateDateColumnMonthlyCashTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Month",
                table: "MonthlyCash");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "MonthlyCash",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "MonthlyCash");

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "MonthlyCash",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
