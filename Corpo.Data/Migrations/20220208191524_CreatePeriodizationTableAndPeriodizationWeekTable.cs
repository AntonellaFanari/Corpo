using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreatePeriodizationTableAndPeriodizationWeekTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CancelSale_Sale_SaleId",
                table: "CancelSale");

            migrationBuilder.DropForeignKey(
                name: "FK_DetailsSale_Sale_SaleId",
                table: "DetailsSale");

            migrationBuilder.DropTable(
                name: "Fee");

            migrationBuilder.DropTable(
                name: "Sale");

            migrationBuilder.DropIndex(
                name: "IX_DetailsSale_SaleId",
                table: "DetailsSale");

            migrationBuilder.DropIndex(
                name: "IX_CancelSale_SaleId",
                table: "CancelSale");

            migrationBuilder.DropColumn(
                name: "SaleId",
                table: "DetailsSale");

            migrationBuilder.DropColumn(
                name: "SaleId",
                table: "CancelSale");

            migrationBuilder.CreateTable(
                name: "Periodization",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Valid = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Periodization", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PeriodizationWeek",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WeekNumber = table.Column<int>(type: "int", nullable: false),
                    M = table.Column<int>(type: "int", nullable: false),
                    S = table.Column<int>(type: "int", nullable: false),
                    Monday = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tuesday = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Wednesday = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Thursday = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Friday = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Saturday = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sunday = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeriodizationWeek", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Periodization");

            migrationBuilder.DropTable(
                name: "PeriodizationWeek");

            migrationBuilder.AddColumn<int>(
                name: "SaleId",
                table: "DetailsSale",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SaleId",
                table: "CancelSale",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Fee",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Credits = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    From = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    Pay = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PlanName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PromotionId = table.Column<int>(type: "int", nullable: true),
                    To = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalPromotion = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Fee_Member_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Member",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Fee_Promotion_PromotionId",
                        column: x => x.PromotionId,
                        principalTable: "Promotion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sale",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MemberId = table.Column<int>(type: "int", nullable: false),
                    Pay = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sale", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sale_Member_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Member",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetailsSale_SaleId",
                table: "DetailsSale",
                column: "SaleId");

            migrationBuilder.CreateIndex(
                name: "IX_CancelSale_SaleId",
                table: "CancelSale",
                column: "SaleId");

            migrationBuilder.CreateIndex(
                name: "IX_Fee_MemberId",
                table: "Fee",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Fee_PromotionId",
                table: "Fee",
                column: "PromotionId");

            migrationBuilder.CreateIndex(
                name: "IX_Sale_MemberId",
                table: "Sale",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_CancelSale_Sale_SaleId",
                table: "CancelSale",
                column: "SaleId",
                principalTable: "Sale",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailsSale_Sale_SaleId",
                table: "DetailsSale",
                column: "SaleId",
                principalTable: "Sale",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
