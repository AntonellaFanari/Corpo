using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Corpo.Data.Migrations
{
    public partial class CreateShiftTableAndScheduleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassPlan_Class_ClassId",
                table: "ClassPlan");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassPlan_Plan_PlanId",
                table: "ClassPlan");

            migrationBuilder.RenameColumn(
                name: "PlanId",
                table: "ClassPlan",
                newName: "PlansId");

            migrationBuilder.RenameColumn(
                name: "ClassId",
                table: "ClassPlan",
                newName: "ClassesId");

            migrationBuilder.RenameIndex(
                name: "IX_ClassPlan_PlanId",
                table: "ClassPlan",
                newName: "IX_ClassPlan_PlansId");

            migrationBuilder.CreateTable(
                name: "Shift",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    From = table.Column<DateTime>(type: "datetime2", nullable: false),
                    To = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Quota = table.Column<int>(type: "int", nullable: false),
                    ClassId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shift", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shift_Class_ClassId",
                        column: x => x.ClassId,
                        principalTable: "Class",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Hour = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Day = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ShiftId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedule_Shift_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "Shift",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Schedule_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_ShiftId",
                table: "Schedule",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_UserId",
                table: "Schedule",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Shift_ClassId",
                table: "Shift",
                column: "ClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassPlan_Class_ClassesId",
                table: "ClassPlan",
                column: "ClassesId",
                principalTable: "Class",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassPlan_Plan_PlansId",
                table: "ClassPlan",
                column: "PlansId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassPlan_Class_ClassesId",
                table: "ClassPlan");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassPlan_Plan_PlansId",
                table: "ClassPlan");

            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropTable(
                name: "Shift");

            migrationBuilder.RenameColumn(
                name: "PlansId",
                table: "ClassPlan",
                newName: "PlanId");

            migrationBuilder.RenameColumn(
                name: "ClassesId",
                table: "ClassPlan",
                newName: "ClassId");

            migrationBuilder.RenameIndex(
                name: "IX_ClassPlan_PlansId",
                table: "ClassPlan",
                newName: "IX_ClassPlan_PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassPlan_Class_ClassId",
                table: "ClassPlan",
                column: "ClassId",
                principalTable: "Class",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassPlan_Plan_PlanId",
                table: "ClassPlan",
                column: "PlanId",
                principalTable: "Plan",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
