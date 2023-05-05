using Application.Competitions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class CompetitionController : BaseApiController
    {

        [HttpGet] //api/competitions
        public async Task<IActionResult> GetCompetitions()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/competitions/fsdklafjsadkl
        public async Task<IActionResult> GetCompetition(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCompetition(Competition competition)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Competition = competition}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompetition(Guid id, Competition competition)
        {
            competition.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Competition = competition}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}