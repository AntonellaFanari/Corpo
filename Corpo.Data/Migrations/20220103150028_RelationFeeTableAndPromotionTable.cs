using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class RelationFeeTableAndPromotionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee");

            migrationBuilder.DropIndex(
                name: "IX_Fee_PromotionId",
                table: "Fee");
        }
    }
}
