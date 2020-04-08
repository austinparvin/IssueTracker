namespace IssueTracker.Models
{
    public class ActionItem
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public bool IsChecked { get; set; } = false;

        // Navigation Properties
        public int IssueId { get; set; }
        public Issue Issue { get; set; }
    }
}