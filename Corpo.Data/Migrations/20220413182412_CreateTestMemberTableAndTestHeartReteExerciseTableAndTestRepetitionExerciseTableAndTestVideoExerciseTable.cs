using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateTestMemberTableAndTestHeartReteExerciseTableAndTestRepetitionExerciseTableAndTestVideoExerciseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExercise_testTemplate_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropPrimaryKey(
                name: "PK_testTemplate",
                table: "testTemplate");

            migrationBuilder.RenameTable(
                name: "testTemplate",
                newName: "TestTemplate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TestTemplate",
                table: "TestTemplate",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "TestMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MemberId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestMember", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestHeartRateExercise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Time = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InitialHeartRate = table.Column<int>(type: "int", nullable: false),
                    FinalHeartRate = table.Column<int>(type: "int", nullable: false),
                    TestMemberId = table.Column<int>(type: "int", nullable: false),
                    TestExerciseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestHeartRateExercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestHeartRateExercise_TestExercise_TestExerciseId",
                        column: x => x.TestExerciseId,
                        principalTable: "TestExercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestHeartRateExercise_TestMember_TestMemberId",
                        column: x => x.TestMemberId,
                        principalTable: "TestMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestRepetitionExercise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Repetitions = table.Column<int>(type: "int", nullable: false),
                    InitialHeartRate = table.Column<int>(type: "int", nullable: false),
                    FinalHeartRate = table.Column<int>(type: "int", nullable: false),
                    TestMemberId = table.Column<int>(type: "int", nullable: false),
                    TestExerciseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestRepetitionExercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestRepetitionExercise_TestExercise_TestExerciseId",
                        column: x => x.TestExerciseId,
                        principalTable: "TestExercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestRepetitionExercise_TestMember_TestMemberId",
                        column: x => x.TestMemberId,
                        principalTable: "TestMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestVideoExercise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Path = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestMemberId = table.Column<int>(type: "int", nullable: false),
                    TestExerciseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestVideoExercise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestVideoExercise_TestExercise_TestExerciseId",
                        column: x => x.TestExerciseId,
                        principalTable: "TestExercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestVideoExercise_TestMember_TestMemberId",
                        column: x => x.TestMemberId,
                        principalTable: "TestMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestHeartRateExercise_TestExerciseId",
                table: "TestHeartRateExercise",
                column: "TestExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TestHeartRateExercise_TestMemberId",
                table: "TestHeartRateExercise",
                column: "TestMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestRepetitionExercise_TestExerciseId",
                table: "TestRepetitionExercise",
                column: "TestExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TestRepetitionExercise_TestMemberId",
                table: "TestRepetitionExercise",
                column: "TestMemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestVideoExercise_TestExerciseId",
                table: "TestVideoExercise",
                column: "TestExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_TestVideoExercise_TestMemberId",
                table: "TestVideoExercise",
                column: "TestMemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId",
                principalTable: "TestTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestExercise_TestTemplate_TestTemplateId",
                table: "TestExercise");

            migrationBuilder.DropTable(
                name: "TestHeartRateExercise");

            migrationBuilder.DropTable(
                name: "TestRepetitionExercise");

            migrationBuilder.DropTable(
                name: "TestVideoExercise");

            migrationBuilder.DropTable(
                name: "TestMember");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TestTemplate",
                table: "TestTemplate");

            migrationBuilder.RenameTable(
                name: "TestTemplate",
                newName: "testTemplate");

            migrationBuilder.AddPrimaryKey(
                name: "PK_testTemplate",
                table: "testTemplate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TestExercise_testTemplate_TestTemplateId",
                table: "TestExercise",
                column: "TestTemplateId",
                principalTable: "testTemplate",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
