using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class addV02MaximumColumnAndLevelColumnTestHeartRateExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Level",
                table: "TestHeartRateExercise",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "V02Maximum",
                table: "TestHeartRateExercise",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "TestHeartRateExercise");

            migrationBuilder.DropColumn(
                name: "V02Maximum",
                table: "TestHeartRateExercise");
        }
    }
}
