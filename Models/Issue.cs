using System;
using System.Collections.Generic;

namespace IssueTracker.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsOpen { get; set; } = true;
        public DateTime DateCreated { get; set; } = DateTime.Now;

        // Navigation Properties
        public int UserId { get; set; }
        public User User { get; set; }

        public List<ActionItem> ActionItems { get; set; }
    }
}