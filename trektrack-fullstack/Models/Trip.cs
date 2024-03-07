using Azure;
using System.ComponentModel.DataAnnotations;


namespace trektrack_fullstack.Models
{
    public class Trip
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string details { get; set; }

        public string? ImageLocation { get; set; }

        [Required]
        public DateTime tripDate { get; set; }


        [Required]
        public int userId { get; set; }

        public UserProfile? UserProfile { get; set; }

        public DateTime PublishDateTime { get; set; }
       
    }
}