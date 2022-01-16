using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreatePromotionAnotherMemberTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOfMembersAdded",
                table: "Promotion");

            migrationBuilder.DropColumn(
                name: "DiscountAnotherMember",
                table: "Promotion");

            migrationBuilder.CreateTable(
                name: "PromotionAnotherMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Discount = table.Column<int>(type: "int", nullable: false),
                    PromotionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromotionAnotherMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PromotionAnotherMember_Promotion_PromotionId",
                        column: x => x.PromotionId,
                        principalTable: "Promotion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PromotionAnotherMember_PromotionId",
                table: "PromotionAnotherMember",
                column: "PromotionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PromotionAnotherMember");

            migrationBuilder.AddColumn<int>(
                name: "AmountOfMembersAdded",
                table: "Promotion",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DiscountAnotherMember",
                table: "Promotion",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
