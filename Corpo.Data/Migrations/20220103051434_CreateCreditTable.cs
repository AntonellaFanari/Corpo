using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateCreditTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Credit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FeeId = table.Column<int>(type: "int", nullable: false),
                    InitialCredit = table.Column<int>(type: "int", nullable: false),
                    CreditConsumption = table.Column<int>(type: "int", nullable: false),
                    Negative = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Credit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Credit_Fee_FeeId",
                        column: x => x.FeeId,
                        principalTable: "Fee",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Credit_FeeId",
                table: "Credit",
                column: "FeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Credit");
        }
    }
}
