using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddVolumeColumnAndIntensityColumnPeriodizationWeekTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Intensity",
                table: "PeriodizationWeek",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Volume",
                table: "PeriodizationWeek",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Intensity",
                table: "PeriodizationWeek");

            migrationBuilder.DropColumn(
                name: "Volume",
                table: "PeriodizationWeek");
        }
    }
}
