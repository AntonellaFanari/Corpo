using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class ModifyNameToHistoryMedicalTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Injury_HistoryMedical_HistoryMedicalId",
                table: "Injury");

            migrationBuilder.DropTable(
                name: "HistoryMedical");

            migrationBuilder.RenameColumn(
                name: "HistoryMedicalId",
                table: "Injury",
                newName: "MedicalHistoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Injury_HistoryMedicalId",
                table: "Injury",
                newName: "IX_Injury_MedicalHistoryId");

            migrationBuilder.CreateTable(
                name: "MedicalHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Period = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weight = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Allergies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeartDisease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RespiratoryDisease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HabitualMedication = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SurgicalIntervention = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Observations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MemberId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicalHistory_Member_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Member",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MedicalHistory_MemberId",
                table: "MedicalHistory",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Injury_MedicalHistory_MedicalHistoryId",
                table: "Injury",
                column: "MedicalHistoryId",
                principalTable: "MedicalHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Injury_MedicalHistory_MedicalHistoryId",
                table: "Injury");

            migrationBuilder.DropTable(
                name: "MedicalHistory");

            migrationBuilder.RenameColumn(
                name: "MedicalHistoryId",
                table: "Injury",
                newName: "HistoryMedicalId");

            migrationBuilder.RenameIndex(
                name: "IX_Injury_MedicalHistoryId",
                table: "Injury",
                newName: "IX_Injury_HistoryMedicalId");

            migrationBuilder.CreateTable(
                name: "HistoryMedical",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Allergies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HabitualMedication = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HeartDisease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    Observations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Period = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RespiratoryDisease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SurgicalIntervention = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weight = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoryMedical", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoryMedical_Member_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Member",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HistoryMedical_MemberId",
                table: "HistoryMedical",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Injury_HistoryMedical_HistoryMedicalId",
                table: "Injury",
                column: "HistoryMedicalId",
                principalTable: "HistoryMedical",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
