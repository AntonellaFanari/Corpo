using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class UpdateResultsWodGroupMemberTableNameByResultsWodGroupMemberExercise : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ResultsWodGroupMember");

            migrationBuilder.CreateTable(
                name: "ResultsWodGroupMemberExercise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WodGroupMemberId = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Rounds = table.Column<int>(type: "int", nullable: false),
                    Repetitions = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResultsWodGroupMemberExercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResultsWodGroupMemberExercise_WodGroupMember_WodGroupMemberId",
                        column: x => x.WodGroupMemberId,
                        principalTable: "WodGroupMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResultsWodGroupMemberExercise_WodGroupMemberId",
                table: "ResultsWodGroupMemberExercise",
                column: "WodGroupMemberId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ResultsWodGroupMemberExercise");

            migrationBuilder.CreateTable(
                name: "ResultsWodGroupMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Repetitions = table.Column<int>(type: "int", nullable: false),
                    Rounds = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WodGroupMemberId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResultsWodGroupMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResultsWodGroupMember_WodGroupMember_WodGroupMemberId",
                        column: x => x.WodGroupMemberId,
                        principalTable: "WodGroupMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResultsWodGroupMember_WodGroupMemberId",
                table: "ResultsWodGroupMember",
                column: "WodGroupMemberId",
                unique: true);
        }
    }
}
