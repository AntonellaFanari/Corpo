using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateExerciseFMSTableAndFileFMSTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExerciseFMS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseFMS", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FileFMS",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExerciseFMSId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileFMS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FileFMS_ExerciseFMS_ExerciseFMSId",
                        column: x => x.ExerciseFMSId,
                        principalTable: "ExerciseFMS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileFMS_ExerciseFMSId",
                table: "FileFMS",
                column: "ExerciseFMSId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileFMS");

            migrationBuilder.DropTable(
                name: "ExerciseFMS");
        }
    }
}
