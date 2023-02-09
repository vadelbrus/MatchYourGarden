using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatchYourGarden.Persistence.Migrations
{
    public partial class AddIsUniqueContraint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Plants",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "LatinName",
                table: "Plants",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Gardens",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Plants_LatinName",
                table: "Plants",
                column: "LatinName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Plants_Name",
                table: "Plants",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Gardens_Name",
                table: "Gardens",
                column: "Name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Plants_LatinName",
                table: "Plants");

            migrationBuilder.DropIndex(
                name: "IX_Plants_Name",
                table: "Plants");

            migrationBuilder.DropIndex(
                name: "IX_Gardens_Name",
                table: "Gardens");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Plants",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "LatinName",
                table: "Plants",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Gardens",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
