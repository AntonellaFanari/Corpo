using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateWeeklyTemplateTableAndWeeklyWodTemplateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeeklyTemplate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyTemplate", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeeklyWodTemplate",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WeeklyTemplateId = table.Column<int>(type: "int", nullable: false),
                    WodTemplateId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyWodTemplate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeeklyWodTemplate_WeeklyTemplate_WeeklyTemplateId",
                        column: x => x.WeeklyTemplateId,
                        principalTable: "WeeklyTemplate",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyWodTemplate_WeeklyTemplateId",
                table: "WeeklyWodTemplate",
                column: "WeeklyTemplateId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeeklyWodTemplate");

            migrationBuilder.DropTable(
                name: "WeeklyTemplate");
        }
    }
}
