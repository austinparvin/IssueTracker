using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IssueTracker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string HashedPassword { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;

        // Navigation Properties

        // Issues the user has created
        public List<Issue> Issues { get; set; }

        // List of Issues the user has claimed
        public List<Issue> ClaimedIssues { get; set; }

    }
}