using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateAnamnesisTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Anamnesis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    CurrentlyPhysicalActivity = table.Column<bool>(type: "bit", nullable: false),
                    Competitive = table.Column<bool>(type: "bit", nullable: false),
                    Sport = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumberTrainingSessionsWeek = table.Column<int>(type: "int", nullable: false),
                    HoursTrainingSessionsWeek = table.Column<int>(type: "int", nullable: false),
                    CurrentlyStrengthTraining = table.Column<bool>(type: "bit", nullable: false),
                    NumberStrengthTrainingSessionsWeek = table.Column<int>(type: "int", nullable: false),
                    StrengthTrainingInThePast = table.Column<bool>(type: "bit", nullable: false),
                    TimeSinceLastTraining = table.Column<int>(type: "int", nullable: false),
                    ConstantfollowUpSpreadsheet = table.Column<bool>(type: "bit", nullable: false),
                    RecreationalAndSporadic = table.Column<bool>(type: "bit", nullable: false),
                    PhysicalActivityInThePast = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anamnesis", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Anamnesis");
        }
    }
}
