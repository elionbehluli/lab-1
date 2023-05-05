using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Competitions
{
    public class Details
    {
        public class Query : IRequest<Result<Competition>>
        {
            public Guid Id { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<Competition>>
        {

            private readonly DataContext _context;
            
            public Handler(DataContext context) {
                _context = context;
            }

            public async Task<Result<Competition>> Handle(Query request, CancellationToken cancellationToken)
            {
                var competition = await _context.Competitions.FindAsync(request.Id);

                return Result<Competition>.Success(competition);
            }

        }
        
    }
}