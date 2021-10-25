using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class MigracionUpdteTableMember : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_HistoryMedical_HistoryMedicalId",
                table: "Member");

            migrationBuilder.DropIndex(
                name: "IX_Member_HistoryMedicalId",
                table: "Member");

            migrationBuilder.DropColumn(
                name: "HistoryMedicalId",
                table: "Member");

            migrationBuilder.AddColumn<int>(
                name: "MemberId",
                table: "HistoryMedical",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_HistoryMedical_MemberId",
                table: "HistoryMedical",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryMedical_Member_MemberId",
                table: "HistoryMedical",
                column: "MemberId",
                principalTable: "Member",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryMedical_Member_MemberId",
                table: "HistoryMedical");

            migrationBuilder.DropIndex(
                name: "IX_HistoryMedical_MemberId",
                table: "HistoryMedical");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "HistoryMedical");

            migrationBuilder.AddColumn<int>(
                name: "HistoryMedicalId",
                table: "Member",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Member_HistoryMedicalId",
                table: "Member",
                column: "HistoryMedicalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_HistoryMedical_HistoryMedicalId",
                table: "Member",
                column: "HistoryMedicalId",
                principalTable: "HistoryMedical",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
