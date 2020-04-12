using System;

namespace IssueTracker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string HashedPassword { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}