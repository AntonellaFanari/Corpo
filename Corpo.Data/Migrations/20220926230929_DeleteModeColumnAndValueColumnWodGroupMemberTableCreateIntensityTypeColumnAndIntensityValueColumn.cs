using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteModeColumnAndValueColumnWodGroupMemberTableCreateIntensityTypeColumnAndIntensityValueColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Value",
                table: "WodGroupMember");

            migrationBuilder.RenameColumn(
                name: "Mode",
                table: "WodGroupMember",
                newName: "IntensityType");

            migrationBuilder.AddColumn<int>(
                name: "IntensityValue",
                table: "WodGroupMember",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IntensityValue",
                table: "WodGroupMember");

            migrationBuilder.RenameColumn(
                name: "IntensityType",
                table: "WodGroupMember",
                newName: "Mode");

            migrationBuilder.AddColumn<decimal>(
                name: "Value",
                table: "WodGroupMember",
                type: "decimal(18,2)",
                nullable: true);
        }
    }
}
