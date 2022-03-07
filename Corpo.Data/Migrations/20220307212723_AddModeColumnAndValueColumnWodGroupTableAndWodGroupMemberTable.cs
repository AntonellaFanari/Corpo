using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddModeColumnAndValueColumnWodGroupTableAndWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "WodMember");

            migrationBuilder.AddColumn<string>(
                name: "Mode",
                table: "WodGroupMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Value",
                table: "WodGroupMember",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mode",
                table: "WodGroup",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Value",
                table: "WodGroup",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mode",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "Mode",
                table: "WodGroup");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "WodGroup");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "WodMember",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
