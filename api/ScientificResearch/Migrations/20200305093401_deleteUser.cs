using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ScientificResearch.Migrations
{
    public partial class deleteUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScientificReports_User_UserId",
                table: "ScientificReports");

            migrationBuilder.DropForeignKey(
                name: "FK_ScientificWorks_User_UserId",
                table: "ScientificWorks");

            migrationBuilder.DropIndex(
                name: "IX_ScientificWorks_UserId",
                table: "ScientificWorks");

            migrationBuilder.DropIndex(
                name: "IX_ScientificReports_UserId",
                table: "ScientificReports");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "User");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "ScientificWorks");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ScientificWorks");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ScientificWorks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ScientificWorks");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "ScientificReportTypes");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ScientificReportTypes");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ScientificReportTypes");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "ScientificReports");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "ScientificReports");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ScientificReports");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ScientificReports");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "Newss");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Newss");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Newss");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "Level");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Level");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Level");

            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "DeletedBy",
                table: "Lecturers");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "Lecturers");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "User",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "User",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "User",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "ScientificWorks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "ScientificWorks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "ScientificWorks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "ScientificWorks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "ScientificReportTypes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "ScientificReportTypes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "ScientificReportTypes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "ScientificReports",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "ScientificReports",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "ScientificReports",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "ScientificReports",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "Newss",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "Newss",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "Newss",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "Level",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "Level",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "Level",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CreateBy",
                table: "Lecturers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeletedBy",
                table: "Lecturers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UpdatedBy",
                table: "Lecturers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ScientificWorks_UserId",
                table: "ScientificWorks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ScientificReports_UserId",
                table: "ScientificReports",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScientificReports_User_UserId",
                table: "ScientificReports",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ScientificWorks_User_UserId",
                table: "ScientificWorks",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
