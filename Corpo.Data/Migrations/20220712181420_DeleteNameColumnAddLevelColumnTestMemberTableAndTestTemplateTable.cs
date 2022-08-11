using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteNameColumnAddLevelColumnTestMemberTableAndTestTemplateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "TestTemplate");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "TestMember");

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "TestTemplate",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "TestMember",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "TestTemplate");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "TestMember");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "TestTemplate",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "TestMember",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
