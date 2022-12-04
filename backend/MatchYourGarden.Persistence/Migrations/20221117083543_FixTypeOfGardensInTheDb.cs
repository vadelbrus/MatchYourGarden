using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MatchYourGarden.Persistence.Migrations
{
    public partial class FixTypeOfGardensInTheDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GardenPlant_Garden_GardensId",
                table: "GardenPlant");

            migrationBuilder.DropForeignKey(
                name: "FK_GardenPlant_Plant_PlantsId",
                table: "GardenPlant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Plant",
                table: "Plant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Garden",
                table: "Garden");

            migrationBuilder.RenameTable(
                name: "Plant",
                newName: "Plants");

            migrationBuilder.RenameTable(
                name: "Garden",
                newName: "Gardens");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Plants",
                table: "Plants",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Gardens",
                table: "Gardens",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GardenPlant_Gardens_GardensId",
                table: "GardenPlant",
                column: "GardensId",
                principalTable: "Gardens",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GardenPlant_Plants_PlantsId",
                table: "GardenPlant",
                column: "PlantsId",
                principalTable: "Plants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GardenPlant_Gardens_GardensId",
                table: "GardenPlant");

            migrationBuilder.DropForeignKey(
                name: "FK_GardenPlant_Plants_PlantsId",
                table: "GardenPlant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Plants",
                table: "Plants");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Gardens",
                table: "Gardens");

            migrationBuilder.RenameTable(
                name: "Plants",
                newName: "Plant");

            migrationBuilder.RenameTable(
                name: "Gardens",
                newName: "Garden");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Plant",
                table: "Plant",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Garden",
                table: "Garden",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GardenPlant_Garden_GardensId",
                table: "GardenPlant",
                column: "GardensId",
                principalTable: "Garden",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GardenPlant_Plant_PlantsId",
                table: "GardenPlant",
                column: "PlantsId",
                principalTable: "Plant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
