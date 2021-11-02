using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RenameTableRoleAcces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleAcces_Role_RoleId",
                table: "RoleAcces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleAcces",
                table: "RoleAcces");

            migrationBuilder.RenameTable(
                name: "RoleAcces",
                newName: "RoleAccess");

            migrationBuilder.RenameIndex(
                name: "IX_RoleAcces_RoleId",
                table: "RoleAccess",
                newName: "IX_RoleAccess_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleAccess",
                table: "RoleAccess",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleAccess_Role_RoleId",
                table: "RoleAccess",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleAccess_Role_RoleId",
                table: "RoleAccess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleAccess",
                table: "RoleAccess");

            migrationBuilder.RenameTable(
                name: "RoleAccess",
                newName: "RoleAcces");

            migrationBuilder.RenameIndex(
                name: "IX_RoleAccess_RoleId",
                table: "RoleAcces",
                newName: "IX_RoleAcces_RoleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleAcces",
                table: "RoleAcces",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleAcces_Role_RoleId",
                table: "RoleAcces",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
