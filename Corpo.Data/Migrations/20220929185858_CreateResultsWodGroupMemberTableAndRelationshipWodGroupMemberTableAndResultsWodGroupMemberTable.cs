using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateResultsWodGroupMemberTableAndRelationshipWodGroupMemberTableAndResultsWodGroupMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResultsWodGroupMemberId",
                table: "WodGroupMember",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ResultsWodGroupMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Rounds = table.Column<int>(type: "int", nullable: false),
                    Repetitions = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResultsWodGroupMember", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember",
                column: "ResultsWodGroupMemberId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WodGroupMember_ResultsWodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember",
                column: "ResultsWodGroupMemberId",
                principalTable: "ResultsWodGroupMember",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WodGroupMember_ResultsWodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember");

            migrationBuilder.DropTable(
                name: "ResultsWodGroupMember");

            migrationBuilder.DropIndex(
                name: "IX_WodGroupMember_ResultsWodGroupMemberId",
                table: "WodGroupMember");

            migrationBuilder.DropColumn(
                name: "ResultsWodGroupMemberId",
                table: "WodGroupMember");
        }
    }
}
