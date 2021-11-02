using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class MigrationUpdateColumnNameRoleTableRoleAccess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Acces",
                table: "RoleAcces",
                newName: "Access");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Access",
                table: "RoleAcces",
                newName: "Acces");
        }
    }
}
