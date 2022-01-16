using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class FeeTablePromotionIdColumnNull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee");

            migrationBuilder.AlterColumn<int>(
                name: "PromotionId",
                table: "Fee",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee",
                column: "PromotionId",
                principalTable: "Promotion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee");

            migrationBuilder.AlterColumn<int>(
                name: "PromotionId",
                table: "Fee",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Fee_Promotion_PromotionId",
                table: "Fee",
                column: "PromotionId",
                principalTable: "Promotion",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
