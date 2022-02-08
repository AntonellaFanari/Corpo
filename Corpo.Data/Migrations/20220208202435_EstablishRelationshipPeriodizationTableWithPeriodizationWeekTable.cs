using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class EstablishRelationshipPeriodizationTableWithPeriodizationWeekTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PeriodizationId",
                table: "PeriodizationWeek",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PeriodizationWeek_PeriodizationId",
                table: "PeriodizationWeek",
                column: "PeriodizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_PeriodizationWeek_Periodization_PeriodizationId",
                table: "PeriodizationWeek",
                column: "PeriodizationId",
                principalTable: "Periodization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeriodizationWeek_Periodization_PeriodizationId",
                table: "PeriodizationWeek");

            migrationBuilder.DropIndex(
                name: "IX_PeriodizationWeek_PeriodizationId",
                table: "PeriodizationWeek");

            migrationBuilder.DropColumn(
                name: "PeriodizationId",
                table: "PeriodizationWeek");
        }
    }
}
