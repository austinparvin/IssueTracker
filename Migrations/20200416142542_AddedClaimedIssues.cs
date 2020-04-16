using Microsoft.EntityFrameworkCore.Migrations;

namespace IssueTracker.Migrations
{
    public partial class AddedClaimedIssues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClaimedUserId",
                table: "Issues",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Issues_ClaimedUserId",
                table: "Issues",
                column: "ClaimedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Issues_Users_ClaimedUserId",
                table: "Issues",
                column: "ClaimedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Issues_Users_ClaimedUserId",
                table: "Issues");

            migrationBuilder.DropIndex(
                name: "IX_Issues_ClaimedUserId",
                table: "Issues");

            migrationBuilder.DropColumn(
                name: "ClaimedUserId",
                table: "Issues");
        }
    }
}
