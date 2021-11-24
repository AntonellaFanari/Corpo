using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationPlanTableAndClassTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Class_Plan_PlanId",
                table: "Class");

            migrationBuilder.DropIndex(
                name: "IX_Class_PlanId",
                table: "Class");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "Class");

            migrationBuilder.CreateTable(
                name: "ClassPlan",
                columns: table => new
                {
                    ClassId = table.Column<int>(type: "int", nullable: false),
                    PlanId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassPlan", x => new { x.ClassId, x.PlanId });
                    table.ForeignKey(
                        name: "FK_ClassPlan_Class_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Class",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassPlan_Plan_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassPlan_PlanId",
                table: "ClassPlan",
                column: "PlanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassPlan");

            migrationBuilder.AddColumn<int>(
                name: "PlanId",
                table: "Class",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Class_PlanId",
                table: "Class",
                column: "PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Class_Plan_PlanId",
                table: "Class",
                column: "PlanId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
