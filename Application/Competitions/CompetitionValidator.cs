using Domain;
using FluentValidation;

namespace Application.Competitions
{
    public class CompetitionValidator : AbstractValidator<Competition>
    {
        public CompetitionValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Season).NotEmpty();
        }

    }
}