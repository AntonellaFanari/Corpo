using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddProtocolColumnTestExerciseTableAndTestExerciceMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Protocol",
                table: "TestExerciseMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Protocol",
                table: "TestExercise",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Protocol",
                table: "TestExerciseMember");

            migrationBuilder.DropColumn(
                name: "Protocol",
                table: "TestExercise");
        }
    }
}
