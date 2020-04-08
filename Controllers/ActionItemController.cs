using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IssueTracker.Models;

namespace IssueTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionItemController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public ActionItemController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/ActionItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActionItem>>> GetActionItems()
        {
            return await _context.ActionItems.ToListAsync();
        }

        // GET: api/ActionItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActionItem>> GetActionItem(int id)
        {
            var actionItem = await _context.ActionItems.FindAsync(id);

            if (actionItem == null)
            {
                return NotFound();
            }

            return actionItem;
        }

        // PUT: api/ActionItem/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActionItem(int id, ActionItem actionItem)
        {
            if (id != actionItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(actionItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActionItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ActionItem
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ActionItem>> PostActionItem(ActionItem actionItem)
        {
            _context.ActionItems.Add(actionItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActionItem", new { id = actionItem.Id }, actionItem);
        }

        [HttpPost("list")]
        public async Task<ActionResult> PostActionItem(List<ActionItem> actionItems)
        {
            _context.ActionItems.AddRange(actionItems);

            await _context.SaveChangesAsync();

            return Ok("ActionItems added");
        }


        // DELETE: api/ActionItem/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActionItem>> DeleteActionItem(int id)
        {
            var actionItem = await _context.ActionItems.FindAsync(id);
            if (actionItem == null)
            {
                return NotFound();
            }

            _context.ActionItems.Remove(actionItem);
            await _context.SaveChangesAsync();

            return actionItem;
        }

        private bool ActionItemExists(int id)
        {
            return _context.ActionItems.Any(e => e.Id == id);
        }
    }
}
