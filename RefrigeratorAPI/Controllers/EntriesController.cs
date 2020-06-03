using RefrigeratorAPI.Data;
using RefrigeratorAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RefrigeratorAPI.Controllers
{

    // shall change to pointer http://localhost:4200/
    [EnableCors("*", "*", "*")]
    public class EntriesController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetEntry(int id)
        {            
            try
            {             
                using (var context = new AppDbContext())
                {
                    var entry = context.Entries.FirstOrDefault(n => n.Id == id);                    
                    if (entry == null) return NotFound();         

                    return Ok(entry);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetEntries()
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var entries = context.Entries.ToList();
                    return Ok(entries);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return BadRequest(ex.Message);               
            }          
        }

        [HttpPost]
        public IHttpActionResult CreateEntity([FromBody]Entry entry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                using (var context = new AppDbContext())
                {                    
                    context.Entries.Add(entry);
                    context.SaveChanges();

                    return Ok("Entry was created.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }       
        }

        [HttpPut]
        public IHttpActionResult UpdateEntry(int id, [FromBody]Entry entry)
        {
            // check request states
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != entry.Id) return BadRequest();

            try
            {
                using (var context = new AppDbContext())
                {
                    var oldEntry = context.Entries.FirstOrDefault(n => n.Id == id);
                    if (oldEntry == null) return NotFound();

                    // update entry
                    oldEntry.Category = entry.Category;
                    oldEntry.Description = entry.Description;
                    oldEntry.IsExpense = entry.IsExpense;
                    oldEntry.Value = entry.Value;
                    oldEntry.Unit = entry.Unit;

                    context.SaveChanges();

                    return Ok("Ok");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteEntry(int id)
        {

            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                using (var context = new AppDbContext())
                {
                    var entry = context.Entries.FirstOrDefault(n => n.Id == id);
                    if (entry == null) return NotFound();

                    context.Entries.Remove(entry);
                    context.SaveChanges();

                    return Ok("Entry deleted");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
