﻿using RefrigeratorAPI.Data;
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
    }
}
