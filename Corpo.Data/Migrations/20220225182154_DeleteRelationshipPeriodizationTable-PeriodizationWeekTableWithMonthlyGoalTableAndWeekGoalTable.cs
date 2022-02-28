using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteRelationshipPeriodizationTablePeriodizationWeekTableWithMonthlyGoalTableAndWeekGoalTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Periodization_MonthlyGoal_MonthlyGoalId",
                table: "Periodization");

            migrationBuilder.DropForeignKey(
                name: "FK_PeriodizationWeek_WeeklyGoal_WeeklyGoalId",
                table: "PeriodizationWeek");

            migrationBuilder.DropIndex(
                name: "IX_PeriodizationWeek_WeeklyGoalId",
                table: "PeriodizationWeek");

            migrationBuilder.DropIndex(
                name: "IX_Periodization_MonthlyGoalId",
                table: "Periodization");

            migrationBuilder.DropColumn(
                name: "WeeklyGoalId",
                table: "PeriodizationWeek");

            migrationBuilder.DropColumn(
                name: "MonthlyGoalId",
                table: "Periodization");

            migrationBuilder.AddColumn<string>(
                name: "Goal",
                table: "PeriodizationWeek",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Goal",
                table: "Periodization",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Goal",
                table: "PeriodizationWeek");

            migrationBuilder.DropColumn(
                name: "Goal",
                table: "Periodization");

            migrationBuilder.AddColumn<int>(
                name: "WeeklyGoalId",
                table: "PeriodizationWeek",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MonthlyGoalId",
                table: "Periodization",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PeriodizationWeek_WeeklyGoalId",
                table: "PeriodizationWeek",
                column: "WeeklyGoalId");

            migrationBuilder.CreateIndex(
                name: "IX_Periodization_MonthlyGoalId",
                table: "Periodization",
                column: "MonthlyGoalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Periodization_MonthlyGoal_MonthlyGoalId",
                table: "Periodization",
                column: "MonthlyGoalId",
                principalTable: "MonthlyGoal",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PeriodizationWeek_WeeklyGoal_WeeklyGoalId",
                table: "PeriodizationWeek",
                column: "WeeklyGoalId",
                principalTable: "WeeklyGoal",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
