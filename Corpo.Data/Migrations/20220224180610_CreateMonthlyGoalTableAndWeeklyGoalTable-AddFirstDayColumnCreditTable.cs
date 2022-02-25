using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateMonthlyGoalTableAndWeeklyGoalTableAddFirstDayColumnCreditTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "FirstDay",
                table: "Credit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MonthlyGoal",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonthlyGoal", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeeklyGoal",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyGoal", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Periodization_MonthlyGoal_MonthlyGoalId",
                table: "Periodization");

            migrationBuilder.DropForeignKey(
                name: "FK_PeriodizationWeek_WeeklyGoal_WeeklyGoalId",
                table: "PeriodizationWeek");

            migrationBuilder.DropTable(
                name: "MonthlyGoal");

            migrationBuilder.DropTable(
                name: "WeeklyGoal");

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

            migrationBuilder.DropColumn(
                name: "FirstDay",
                table: "Credit");

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
    }
}
