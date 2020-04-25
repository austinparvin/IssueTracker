using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IssueTracker.Models
{
    public class Issue
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsOpen { get; set; } = true;
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public int Importance { get; set; } = 1;

        // Navigation Properties
        // Who the issue was created by
        public string UserEmail { get; set; }

        // Who is assigned the issue
        public string? ClaimedUserEmail { get; set; }

        public List<ActionItem> ActionItems { get; set; }
    }
}