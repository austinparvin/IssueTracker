using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> GetCurrentUser()
        {
            var userId = User.Claims.FirstOrDefault(claim => claim.Type == "id").Value;
            
            return Ok(userId);
        }
    }
}