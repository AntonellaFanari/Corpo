using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateWodGroupMemberTableAndWodMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WodMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WodMember", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WodGroupMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    ModalityId = table.Column<int>(type: "int", nullable: false),
                    Detail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Units = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupIndex = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WodMemberId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WodGroupMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WodGroupMember_Exercise_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WodGroupMember_Modality_ModalityId",
                        column: x => x.ModalityId,
                        principalTable: "Modality",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WodGroupMember_WodMember_WodMemberId",
                        column: x => x.WodMemberId,
                        principalTable: "WodMember",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WodGroupMember_ExerciseId",
                table: "WodGroupMember",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_WodGroupMember_ModalityId",
                table: "WodGroupMember",
                column: "ModalityId");

            migrationBuilder.CreateIndex(
                name: "IX_WodGroupMember_WodMemberId",
                table: "WodGroupMember",
                column: "WodMemberId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WodGroupMember");

            migrationBuilder.DropTable(
                name: "WodMember");
        }
    }
}
