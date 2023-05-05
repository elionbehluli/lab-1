using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Competitions
{
    public class List
    {
        public class Query : IRequest<Result<List<Competition>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Competition>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Competition>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Competition>>.Success(await _context.Competitions.ToListAsync());
            }
        }
    }
}