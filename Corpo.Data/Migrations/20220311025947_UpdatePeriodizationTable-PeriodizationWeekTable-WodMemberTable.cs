using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdatePeriodizationTablePeriodizationWeekTableWodMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "WodMember");

            migrationBuilder.AddColumn<int>(
                name: "PeriodizationId",
                table: "WodMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeekNumber",
                table: "WodMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WodNumber",
                table: "WodMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Planned",
                table: "PeriodizationWeek",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Trainings",
                table: "Periodization",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PeriodizationId",
                table: "WodMember");

            migrationBuilder.DropColumn(
                name: "WeekNumber",
                table: "WodMember");

            migrationBuilder.DropColumn(
                name: "WodNumber",
                table: "WodMember");

            migrationBuilder.DropColumn(
                name: "Planned",
                table: "PeriodizationWeek");

            migrationBuilder.DropColumn(
                name: "Trainings",
                table: "Periodization");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "WodMember",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
