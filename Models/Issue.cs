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

        // Navigation Properties
        // Who the issue was created by

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        // Who is assigned the issue
        public int? ClaimedUserId { get; set; }
        [ForeignKey("ClaimedUserId")]
        public User ClaimedUser { get; set; }

        public List<ActionItem> ActionItems { get; set; }
    }
}