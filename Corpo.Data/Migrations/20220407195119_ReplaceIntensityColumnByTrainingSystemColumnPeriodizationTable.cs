using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class ReplaceIntensityColumnByTrainingSystemColumnPeriodizationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Intensity",
                table: "Periodization",
                newName: "TrainingSystem");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TrainingSystem",
                table: "Periodization",
                newName: "Intensity");
        }
    }
}
