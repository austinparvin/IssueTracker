using Microsoft.EntityFrameworkCore.Migrations;

namespace IssueTracker.Migrations
{
    public partial class AddedUserIdToIssues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Issues",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Issues_UserId",
                table: "Issues",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_Users_UserId",
                table: "Issues",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Issues_Users_UserId",
                table: "Issues");

            migrationBuilder.DropIndex(
                name: "IX_Issues_UserId",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Issues");
        }
    }
}
