using System;

namespace IssueTracker.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsOpen { get; set; } = true;
        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}