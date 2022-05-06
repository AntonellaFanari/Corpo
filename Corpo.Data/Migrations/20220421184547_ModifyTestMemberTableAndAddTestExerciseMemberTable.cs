using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class ModifyTestMemberTableAndAddTestExerciseMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestExerciseMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestType = table.Column<int>(type: "int", nullable: false),
                    Minutes = table.Column<int>(type: "int", nullable: true),
                    Seconds = table.Column<int>(type: "int", nullable: true),
                    Video = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestMemberId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestExerciseMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestExerciseMember_TestMember_TestMemberId",
                        column: x => x.TestMemberId,
                        principalTable: "TestMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestExerciseMember_TestMemberId",
                table: "TestExerciseMember",
                column: "TestMemberId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestExerciseMember");
        }
    }
}
