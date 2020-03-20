using ScientificResearch.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ScientificResearch.Core.Business.Models.News_s
{
    public class NewsManageModel : IValidatableObject
    {
        public string Title { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public void GetNewsFromModel(News news)
        {
            news.Title = Title;
            news.Summary = Summary;
            news.Content = Content;
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Title))
            {
                yield return new ValidationResult("Title name is required!", new string[] { "Title" });
            }
        }
    }
}
