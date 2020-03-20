using Microsoft.EntityFrameworkCore.Migrations;

namespace ScientificResearch.Migrations
{
    public partial class CreateDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LecturerName",
                table: "Lecturers");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "ScientificReports",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Lecturers",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "ScientificReports");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Lecturers");

            migrationBuilder.AddColumn<string>(
                name: "LecturerName",
                table: "Lecturers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
