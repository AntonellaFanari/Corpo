using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class MemberTableDeleteRelationshipPlanTableAndEstablishRelationshipPlanHistoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_Plan_PlanId",
                table: "Member");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "Member",
                newName: "PlanHistoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Member_PlanId",
                table: "Member",
                newName: "IX_Member_PlanHistoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_PlanHistory_PlanHistoryId",
                table: "Member",
                column: "PlanHistoryId",
                principalTable: "PlanHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_PlanHistory_PlanHistoryId",
                table: "Member");

            migrationBuilder.RenameColumn(
                name: "PlanHistoryId",
                table: "Member",
                newName: "PlanId");

            migrationBuilder.RenameIndex(
                name: "IX_Member_PlanHistoryId",
                table: "Member",
                newName: "IX_Member_PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_Plan_PlanId",
                table: "Member",
                column: "PlanId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
