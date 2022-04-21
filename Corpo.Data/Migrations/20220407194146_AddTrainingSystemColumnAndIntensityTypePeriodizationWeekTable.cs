using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddTrainingSystemColumnAndIntensityTypePeriodizationWeekTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Intensity",
                table: "PeriodizationWeek",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IntensityType",
                table: "PeriodizationWeek",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TrainingSystem",
                table: "PeriodizationWeek",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IntensityType",
                table: "PeriodizationWeek");

            migrationBuilder.DropColumn(
                name: "TrainingSystem",
                table: "PeriodizationWeek");

            migrationBuilder.AlterColumn<string>(
                name: "Intensity",
                table: "PeriodizationWeek",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
