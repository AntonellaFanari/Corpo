using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddPathImgColumnAndRateColumnTestVideoExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Path",
                table: "TestVideoExercise",
                newName: "PathVideo");

            migrationBuilder.AddColumn<string>(
                name: "PathImg",
                table: "TestVideoExercise",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rate",
                table: "TestVideoExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathImg",
                table: "TestVideoExercise");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "TestVideoExercise");

            migrationBuilder.RenameColumn(
                name: "PathVideo",
                table: "TestVideoExercise",
                newName: "Path");
        }
    }
}
