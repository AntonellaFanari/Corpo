using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateFeeTablePromotionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Member_PlanHistory_PlanHistoryId",
                table: "Member");

            migrationBuilder.DropTable(
                name: "PlanHistory");

            migrationBuilder.RenameColumn(
                name: "PlanHistoryId",
                table: "Member",
                newName: "PlanId");

            migrationBuilder.RenameIndex(
                name: "IX_Member_PlanHistoryId",
                table: "Member",
                newName: "IX_Member_PlanId");

            migrationBuilder.AddColumn<int>(
                name: "Credits",
                table: "Fee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "Fee",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PromotionId",
                table: "Fee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "Fee",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Fee_PromotionId",
                table: "Fee",
                column: "PromotionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee",
                column: "PromotionId",
                principalTable: "Promotion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Member_Plan_PlanId",
                table: "Member",
                column: "PlanId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee");

            migrationBuilder.DropForeignKey(
                name: "FK_Member_Plan_PlanId",
                table: "Member");

            migrationBuilder.DropIndex(
                name: "IX_Fee_PromotionId",
                table: "Fee");

            migrationBuilder.DropColumn(
                name: "Credits",
                table: "Fee");

            migrationBuilder.DropColumn(
                name: "From",
                table: "Fee");

            migrationBuilder.DropColumn(
                name: "PromotionId",
                table: "Fee");

            migrationBuilder.DropColumn(
                name: "To",
                table: "Fee");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "Member",
                newName: "PlanHistoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Member_PlanId",
                table: "Member",
                newName: "IX_Member_PlanHistoryId");

            migrationBuilder.CreateTable(
                name: "PlanHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Credits = table.Column<int>(type: "int", nullable: false),
                    From = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlanId = table.Column<int>(type: "int", nullable: false),
                    PromotionId = table.Column<int>(type: "int", nullable: false),
                    To = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanHistory_Plan_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanHistory_Promotion_PromotionId",
                        column: x => x.PromotionId,
                        principalTable: "Promotion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanHistory_PlanId",
                table: "PlanHistory",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanHistory_PromotionId",
                table: "PlanHistory",
                column: "PromotionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Member_PlanHistory_PlanHistoryId",
                table: "Member",
                column: "PlanHistoryId",
                principalTable: "PlanHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
