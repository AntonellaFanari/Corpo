using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class addWodTemplateIdColumnPeriodizationWeekTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WodTemplateId",
                table: "PeriodizationWeek",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WodTemplateId",
                table: "PeriodizationWeek");
        }
    }
}
