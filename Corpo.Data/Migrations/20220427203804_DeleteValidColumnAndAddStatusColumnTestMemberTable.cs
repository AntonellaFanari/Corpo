using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteValidColumnAndAddStatusColumnTestMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Valid",
                table: "TestMember");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "TestMember",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "TestMember");

            migrationBuilder.AddColumn<bool>(
                name: "Valid",
                table: "TestMember",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
