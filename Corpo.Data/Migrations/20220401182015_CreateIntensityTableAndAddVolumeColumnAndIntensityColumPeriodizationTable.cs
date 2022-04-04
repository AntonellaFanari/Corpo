using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateIntensityTableAndAddVolumeColumnAndIntensityColumPeriodizationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Intensity",
                table: "Periodization",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Volume",
                table: "Periodization",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Intensity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Up = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Down = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Intensity", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Intensity");

            migrationBuilder.DropColumn(
                name: "Intensity",
                table: "Periodization");

            migrationBuilder.DropColumn(
                name: "Volume",
                table: "Periodization");
        }
    }
}
