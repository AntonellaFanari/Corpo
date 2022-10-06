using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class AddStaggeredTypeColumnStaggeredValueColumnInWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StaggeredType",
                table: "WodGroupMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StaggeredValue",
                table: "WodGroupMember",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StaggeredType",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "StaggeredValue",
                table: "WodGroupMember");
        }
    }
}
