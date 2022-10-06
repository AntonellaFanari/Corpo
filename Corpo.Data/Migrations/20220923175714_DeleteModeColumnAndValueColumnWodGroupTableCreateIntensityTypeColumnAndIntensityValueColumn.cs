using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class DeleteModeColumnAndValueColumnWodGroupTableCreateIntensityTypeColumnAndIntensityValueColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Value",
                table: "WodGroup");

            migrationBuilder.RenameColumn(
                name: "Mode",
                table: "WodGroup",
                newName: "IntensityType");

            migrationBuilder.AddColumn<int>(
                name: "IntensityValue",
                table: "WodGroup",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IntensityValue",
                table: "WodGroup");

            migrationBuilder.RenameColumn(
                name: "IntensityType",
                table: "WodGroup",
                newName: "Mode");

            migrationBuilder.AddColumn<decimal>(
                name: "Value",
                table: "WodGroup",
                type: "decimal(18,2)",
                nullable: true);
        }
    }
}
